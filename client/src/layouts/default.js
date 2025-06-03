
import { useUser } from "../utils/useUser";

const links = [
    { textcontent: 'Home', href: '/home' },
    { textcontent: 'Projects', href: '/projects' },
    // { textcontent: 'Add projects', href: '/account' },
];

async function drawHeader() {
    const user = await useUser();
    console.log("Current user:", user);


    const header = document.createElement('header')
    const logo = document.createElement('h1')
    const div = document.createElement('div')
    const nav = document.createElement('nav')


    nav.classList.add('navigation');
    logo.classList.add('logo')
    header.classList.add('header');
    div.classList.add('navigation_box')

    for (let link of links) {
        const a = document.createElement('a');
        a.textContent = link.textcontent;
        a.href = link.href;
        // if (window.location.pathname === link.href) {
        //     a.classList.add('active-link');
        // }
        nav.appendChild(a);
    }
    logo.innerHTML = user.user?.displayName || 'Blog';


    div.append(nav)
    header.append(logo)
    header.append(div)
    document.body.prepend(header);
}

(async function drawLayout() {
    await drawHeader();
})();

const user = await useUser();
console.log("USER FROM useUser:", user);
