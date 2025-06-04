import '../assets/signup.css';
import { cookie } from '../utils/cookie';
import { useToast } from '../utils/hooks';
import { useUser } from '../utils/useUser';
import axios from 'axios';

function signup() {
    

const form = document.forms.signup;
const app = document.querySelector('#app');
const overlay = document.querySelector('#loading-overlay');

overlay.classList.add('hidden');

form.onsubmit = async (e) => {
    e.preventDefault();
    overlay.classList.remove('hidden');
    const user = {};
    const fm = new FormData(form);
    fm.forEach((value, key) => {
        user[key] = value.trim();
    });

    if (!form) {
        console.log('Форма не найдена');
        return;
    }

    const { email, password, displayName } = user;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password || !displayName) {
        useToast('error', 'Пожалуйста, заполните все поля');
        return;
    }

    if (!emailRegex.test(email)) {
        useToast('error', 'Некорректный email');
        return;
    }

    if (password.length < 6) {
        useToast('error', 'Пароль должен быть не менее 6 символов');
        return;
    }

    if (displayName.length < 2) {
        useToast('error', 'Имя должно содержать минимум 2 символа');
        return;
    }

    try {
        // Создаем пользователя
        await axios.post(import.meta.env.VITE_API_URL + '/users', user);

        // Логинимся, чтобы получить токен
        const loginResponse = await axios.post(import.meta.env.VITE_API_URL + '/authentication', {
            strategy: 'local',
            email,
            password
        });

        const accessToken = loginResponse.data.accessToken;
        cookie.setCookie('accessToken', accessToken, 1);
        useToast('success', 'Регистрация прошла успешно!');

        // Удаляем форму регистрации
        form.remove();

        // Показываем форму добавления картинки
        showAddImageForm();

    } catch (error) {
        useToast('error', 'Ошибка регистрации: ' + error.message);
    } finally {
        overlay.classList.add('hidden');
    }
};

function showAddImageForm() {
    const existingForm = document.querySelector('#my-form');
    if (existingForm) return;

    const newForm = document.createElement('form');
    newForm.id = 'my-form';
    newForm.name = 'add_image';

    newForm.innerHTML = `
        <h1>Add image</h1>
        <div class="data">
            <input type="text" name="image" required placeholder="image URL">
            <button type="button" class="add">Add</button>
        </div>
    `;

    app.appendChild(newForm);

    const addButton = newForm.querySelector('.add');
    addButton.addEventListener('click', async (e) => {
        e.preventDefault();
        overlay.classList.remove('hidden');
        const fm = new FormData(newForm);
        const imageUrl = fm.get('image').trim();

        if (!imageUrl) {
            useToast('error', 'Пожалуйста, введите ссылку на изображение');
            return;
        }

        try {
            const user = await useUser();
            if (!user) {
                useToast('error', 'Пользователь не найден или не авторизован');
                return;
            }

            const accessToken = cookie.getCookie('accessToken');

            await axios.patch(import.meta.env.VITE_API_URL + '/users/' + user.user._id, {
                images: [imageUrl]
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            useToast('success', 'Изображение успешно добавлено!');
            newForm.reset();
            setTimeout(() => {
                window.location.href = '/home';
            }, 1000);
        } catch (error) {
            useToast('error', 'Ошибка добавления изображения: ' + error.message);
        } finally {
            overlay.classList.add('hidden')
        }
    });
}
}
signup()