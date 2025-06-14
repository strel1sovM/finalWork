
  import '../assets/signin.css';
  console.log(`main.logged`);


  import { cookie } from '../utils/cookie.js';
  import { useToast } from '../utils/hooks.js';
  import axios from 'axios';

  const overlay = document.querySelector('#loading-overlay');


  const app = document.getElementById('app');
  console.log(app);

  const form = document.querySelector('#my-form-signin');


  export function loadALL(params) {

    if (!form) {
      return
    }
    console.log(`loadAll activated`);

    form.onsubmit = async (e) => {
      e.preventDefault();

      overlay.classList.remove('hidden');

      const user = {};
      const fm = new FormData(form);
      fm.forEach((value, key) => (user[key] = value));

      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/authentication', {
          ...user,
          strategy: 'local'
        });
        

        cookie.setCookie('accessToken', response.data.accessToken, 1);
        useToast('success', 'Вы успешно вошли!');
        setTimeout(() => {
          window.location.href = '/home';
        }, 1000);
      } catch (error) {
        useToast('error', 'Ошибка входа: ' + (error.code || 'Неизвестная'));
      } finally {
        overlay.classList.add('hidden');
      }
    };


  }
  try {
    loadALL()
  } finally {

  }





