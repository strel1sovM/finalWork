    // import '../assets/default.css';
    // import '../assets/account.css';


    // import axios from 'axios';
    // import { cookie } from '../utils/cookie';
    // import { useToast } from '../utils/hooks';
    // import { useUser } from '../utils/useUser';
    // const overlay = document.querySelector('#loading-overlay');


    // overlay.classList.add('hidden');

    // const form = document.forms.add_tasks;
    // let allUsers = [];

    // // Функция загрузки участников
    // async function loadParticipants() {
    //     const token = cookie.getCookie('accessToken');
    //     if (!token) return;

    //     try {
    //         const res = await axios.get(import.meta.env.VITE_API_URL + '/users', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });

    //         let users = res.data.data || res.data;

    //         const uniqueUsersMap = new Map();
    //         users.forEach(user => {
    //             const id = String(user._id).trim();
    //             if (!uniqueUsersMap.has(id)) uniqueUsersMap.set(id, user);
    //         });

    //         allUsers = Array.from(uniqueUsersMap.values());

    //         const participantsList = document.getElementById('participants-list');
    //         participantsList.innerHTML = '';

    //         allUsers.forEach(user => {
    //             const id = String(user._id).trim();

    //             const label = document.createElement('label');
    //             label.style.display = 'block';
    //             label.style.marginBottom = '4px';

    //             const checkbox = document.createElement('input');
    //             checkbox.type = 'checkbox';
    //             checkbox.value = id;
    //             checkbox.name = 'participants';

    //             label.appendChild(checkbox);
    //             label.appendChild(document.createTextNode(' ' + (user.displayName || user.username || user.email || 'Unknown')));

    //             participantsList.appendChild(label);
    //         });

    //     } catch (error) {
    //         console.error('Не удалось загрузить участников:', error);
    //         useToast('error', 'Ошибка загрузки участников');
    //     } finally {
            


    //         overlay.classList.add('hidden');

    //     }
    // }

    // // Инициализация: загрузка участников и настройка обработчика формы
    // async function init() {
    //     await loadParticipants();

    //     if (form) {
    //         form.onsubmit = async (e) => {
    //             e.preventDefault();

    //             const token = cookie.getCookie('accessToken');
    //             if (!token) {
    //                 useToast('error', 'Пользователь не авторизован');
    //                 window.location.href = '/signin';
    //                 return;
    //             }

    //             const currentUser = await useUser();
    //             if (!currentUser) {
    //                 useToast('error', 'Не удалось получить данные пользователя');
    //                 return;
    //             }

    //             const formData = new FormData(form);
    //             const projectName = formData.get('project_name')?.toString().trim();
    //             const projectDisplayName = formData.get('project_display_name')?.toString().trim();
    //             const sectionName = formData.get('section_name')?.toString().trim();
    //             const taskTitle = formData.get('task_title')?.toString().trim();


    //             const selectedUserIds = [];
    //             formData.forEach((value, key) => {
    //                 if (key === 'participants') selectedUserIds.push(value.toString());
    //             });

    //             const currentUserId = String(currentUser._id);
    //             if (!selectedUserIds.includes(currentUserId)) selectedUserIds.push(currentUserId);

    //             if (!projectName || !projectDisplayName || !sectionName || !taskTitle || selectedUserIds.length === 0) {
    //                 useToast('error', 'Пожалуйста, заполните все поля');
    //                 return;
    //             }

    //             const selectedUsers = allUsers.filter(user => selectedUserIds.includes(String(user._id)));

    //             const participants = selectedUsers.map(user => ({
    //                 userId: user._id,
    //                 userName: user.username || user.email || '',
    //                 userDisplayName: user.displayName || ''
    //             }));

    //             const project = {
    //                 name: projectName,
    //                 displayName: projectDisplayName,
    //                 participants,
    //                 sections: [
    //                     {
    //                         title: sectionName,
    //                         tasks: [
    //                             {
    //                                 title: taskTitle,
                        
    //                             }
    //                         ]
    //                     }
    //                 ],
    //             };

    //             try {
    //                 const response = await axios.post(import.meta.env.VITE_API_URL + '/projects', project, {
    //                     headers: { Authorization: `Bearer ${token}` }
    //                 });

    //                 useToast('success', 'Проект успешно создан!');
    //                 console.log('Создан проект:', response.data);

    //                 const updatedUser = await useUser();
    //                 console.log('Обновленные данные пользователя:', updatedUser);

    //                 window.location.href = '/projects';

    //             } catch (error) {
    //                 console.error('Ошибка при создании проекта:', error);
    //                 const message = error.response?.data?.message || error.message;
    //                 useToast('error', 'Ошибка: ' + message);

    //                 if (error.response?.status === 401) {
    //                     cookie.setCookie('accessToken', '', -1);
    //                     window.location.href = '/signin';
    //                 }
    //             } finally {
    //                 loader.classList.add('hidden')
    //             }
    //         };
    //     }
    // }

    // init();
