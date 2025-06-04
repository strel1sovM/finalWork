
    import AuthMiddleware from "../middlewares/auth.js";

    const routes = [
        {
            path: /^\/$/,
            view: async () => {
                const res = await fetch('src/pages/setup.html');
                return await res.text();
            },
            loadScritps: async () => {
                await import("../scripts/setup.js");
            },
            layout: false
        },

        {
            path: /^\/signup$/,
            view: async () => {
                const res = await fetch('src/pages/signup.html');
                return await res.text();
            },
            loadScritps: async () => {
                await import("../scripts/signup.js");
            },
            layout: false
        },
        {
            path: /^\/home$/,
            view: async () => {
                const res = await fetch('src/pages/home.html');
                return await res.text();
            },
            middlewares: [AuthMiddleware],
            loadScritps: async () => {
                await import("../scripts/home.js");
            },
            layout: 'default'
        },
        {
            path: /^\/projects$/,
            view: async () => {
                const res = await fetch('src/pages/projects.html');
                return await res.text();
            },
            middlewares: [AuthMiddleware],
            loadScritps: async () => {
                await import("../scripts/projects.js");
            },
            layout: 'default'
        },

    ];



    export async function router() {
        console.clear();
        const path = window.location.pathname;
        const app = document.getElementById('app');
        const overlay = document.querySelector('#loading-overlay');
        overlay?.classList.remove('hidden');
        for (const route of routes) {
            const match = path.match(route.path);

            if (match) {
                if (route.middlewares) {
                    for (const middleware of route.middlewares) {
                        const result = await middleware();
                        if (result === false) return;
                    }
                }

                const content = await route.view(match);

                if (route.layout) {
                    const layoutModule = await import(`../layouts/${route.layout}.js`);
                    if (typeof layoutModule.drawLayout === 'function') {
                        await layoutModule.drawLayout();
                    }
                }

                app.innerHTML = content;
                await route.loadScritps();
                overlay?.classList.add('hidden');
                return;
            }

        }

        const res = await fetch('src/pages/404.html');
        app.innerHTML = await res.text();

    }


    export function handleLinkClick(e) {
        if (e.target.matches('a[data-link]')) {
            e.preventDefault();
            const url = e.target.href;
            history.pushState(null, null, url);
            router();
        }
    }
