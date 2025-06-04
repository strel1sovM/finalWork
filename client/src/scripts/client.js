// // main.js
// import '../assets/signin.css';

// import { handleLinkClick, router } from '../router/router.js';
// import { cookie } from '../utils/cookie.js';
// import { useToast } from '../utils/hooks.js';
// import axios from 'axios';

// const overlay = document.querySelector('#loading-overlay');

// export function createSigninForm() {
//   const html = `
//     <form id="my-form" name="signin">
//       <h1>Welcome</h1>
//       <div class="data">
//         <input type="email" name="email" required placeholder="email">
//         <input type="password" name="password" required placeholder="password">
//         <button type="submit" class="enter">welcome</button>
//       </div>
//       <div class="or">
//         // forgot password?<br>
//         <a href="/signup" data-link>Signup</a>
//       </div>
//     </form>
//   `;
//   const app = document.getElementById('app');
//   console.log(app);

//   app.innerHTML = html;

//   const form = document.querySelector('#my-form');

//   form.onsubmit = async (e) => {
//     e.preventDefault();

//     overlay.classList.remove('hidden');

//     const user = {};
//     const fm = new FormData(form);
//     fm.forEach((value, key) => (user[key] = value));

//     try {
//       const response = await axios.post(import.meta.env.VITE_API_URL + '/authentication', {
//         ...user,
//         strategy: 'local'
//       });

//       cookie.setCookie('accessToken', response.data.accessToken, 1);
//       useToast('success', 'Вы успешно вошли!');
//       setTimeout(() => {
//         window.location.href = '/home';
//       }, 1000);
//     } catch (error) {
//       useToast('error', 'Ошибка входа: ' + (error.code || 'Неизвестная'));
//     } finally {
//       overlay.classList.add('hidden');
//     }
//   };
// }

// try {

//   createSigninForm();
// } finally {


// }


// window.addEventListener('popstate', router);
// document.addEventListener('click', handleLinkClick);
