    import { dirname, resolve } from 'node:path'
    import { fileURLToPath } from 'node:url'
    import { defineConfig } from 'vite'

    const __dirname = dirname(fileURLToPath(import.meta.url))

    export default defineConfig({
        esbuild: {
            target: 'esnext'
        },
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                    home: resolve(__dirname, 'src/pages/pojects.html'),
                    signup: resolve(__dirname, 'src/pages/signup.html'),
                    404: resolve(__dirname, 'src/pages/404.html'),
                    account: resolve(__dirname, 'src/pages/account.html'),
                },
            },
        },
    })