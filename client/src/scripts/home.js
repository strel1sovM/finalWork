
import '../assets/default.css';
import '../assets/home.css';

import axios from 'axios';
import { cookie } from '../utils/cookie';
import { useToast } from '../utils/hooks';

const overlay = document.querySelector('#loading-overlay');
overlay.classList.add('hidden');
let invitedUserIds = [];
let allUsers = [];

function createParticipantElement(name) {
    const div = document.createElement('div');
    div.classList.add('participant');
    div.textContent = name;
    return div;
}

function createAddParticipantButton() {
    const div = document.createElement('div');
    div.classList.add('participant_add');

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'black');
    svg.setAttribute('viewBox', '0 0 16 16');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M8 1a.5.5 0 0 1 .5.5V7h5.5a.5.5 0 0 1 0 1H8.5v5.5a.5.5 0 0 1-1 0V8H2a.5.5 0 0 1 0-1h5.5V1.5A.5.5 0 0 1 8 1z');

    svg.appendChild(path);
    div.appendChild(svg);

    return div;
}

function createProjectForm() {
    const form = document.createElement('form');
    form.id = 'my-form';
    form.name = 'add_tasks';
    form.style.position = 'relative';

    form.innerHTML = `
        <button type="button" class="close-form-button">&times;</button>
        <h1>create project</h1>
        <input type="text" name="project_name" id="project_name" placeholder="project name" required>
        <input type="text" name="project_display_name" id="project__display_name" placeholder="project displayname" required>
        
        <label for="participants">participants:</label>
        <div id="participants-list"></div>

        <input type="text" name="section_name" id="section_name" placeholder="section name" required>
        <input type="text" name="task_name" id="task_name" placeholder="task name" required>
        <input type="text" name="task_title" id="task_title" placeholder="task title" required>

        <label for="priority">priority:</label>
        <select id="priority" name="priority">
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="hight">hard</option>
        </select>

        <button class="create_section" type="submit">создать</button>
    `;

    form.querySelector('.close-form-button').addEventListener('click', () => {
        form.remove();
    });

    return form;
}

function createProjectsHeader() {
    const header = document.createElement('div');
    header.classList.add('projects-header');

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Проекты';

    const createButton = document.createElement('button');
    createButton.classList.add('create-button');
    createButton.textContent = 'Создать проект';

    const inviteButton = document.createElement('button');
    inviteButton.classList.add('invite-button');
    inviteButton.textContent = 'Пригласить';

    createButton.addEventListener('click', async () => {
        if (!document.querySelector('#my-form')) {
            const form = createProjectForm();
            document.querySelector('.content').appendChild(form);
            await loadParticipants();
            setupFormHandler();
        }
    });

    inviteButton.addEventListener('click', async () => {
        if (!document.querySelector('#invite-list')) {
            await showInviteList();
        }
    });

    header.appendChild(title);
    header.appendChild(createButton);
    header.appendChild(inviteButton);

    return header;
}

function buildLayout() {
    const app = document.querySelector('#app');

    const container = document.createElement('div');
    container.classList.add('container');

    const sidebar = document.createElement('aside');
    sidebar.classList.add('sidebar');
    sidebar.appendChild(createParticipantElement('ur'));
    sidebar.appendChild(createAddParticipantButton());

    const main = document.createElement('main');
    main.classList.add('content');
    main.appendChild(createProjectsHeader());

    container.appendChild(sidebar);
    container.appendChild(main);
    app.innerHTML = '';
    app.append(container);

    const addButton = sidebar.querySelector('.participant_add');
    addButton.addEventListener('click', async () => {
        if (!document.querySelector('#my-form')) {
            const form = createProjectForm();
            document.querySelector('.content').appendChild(form);
            await loadParticipants();
            setupFormHandler();
        }
    });
}

async function loadParticipants() {
    const token = cookie.getCookie('accessToken');
    if (!token) return;

    try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/users', {
            headers: { Authorization: `Bearer ${token}` }
        });

        const users = res.data.data || res.data;
        const uniqueUsersMap = new Map();

        users.forEach(user => {
            const id = String(user._id).trim();
            const name = user.displayName || user.username || user.email || 'Unknown';

            if (!Array.from(uniqueUsersMap.values()).some(u => {
                const n = u.displayName || u.username || u.email || 'Unknown';
                return n === name;
            })) {
                uniqueUsersMap.set(id, user);
            }
        });
        allUsers = Array.from(uniqueUsersMap.values());

        const participantsList = document.getElementById('participants-list');
        if (participantsList) {
            participantsList.innerHTML = '';
            allUsers.forEach(user => {
                const id = String(user._id).trim();
                const label = document.createElement('label');
                label.style.display = 'block';
                label.style.marginBottom = '4px';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = id;
                checkbox.name = 'participants';

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(' ' + (user.displayName || user.username || user.email || 'Unknown')));
                participantsList.appendChild(label);
            });
        }
    } catch (error) {
        console.error('Не удалось загрузить участников:', error);
        useToast('error', 'Ошибка загрузки участников');
    } finally {
        overlay.classList.add('hidden');
    }
}

async function showInviteList() {
    await loadParticipants();

    const existing = document.querySelector('#invite-list');
    if (existing) existing.remove();

    const inviteBox = document.createElement('div');
    inviteBox.id = 'invite-list';
    inviteBox.classList.add('invite-list');

    const form = document.createElement('form');
    form.id = 'invite-form';

    allUsers.forEach(user => {
        const label = document.createElement('label');
        label.style.display = 'block';
        label.style.marginBottom = '6px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'invitees';
        checkbox.value = String(user._id).trim();

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + (user.displayName || user.username || user.email || 'Unknown')));
        form.appendChild(label);
    });

    const sendBtn = document.createElement('button');
    sendBtn.type = 'submit';
    sendBtn.textContent = 'Добавить участников';
    sendBtn.className = 'sendBtn';

    form.appendChild(sendBtn);

    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const selectedIds = formData.getAll('invitees');

        if (selectedIds.length === 0) {
            useToast('error', 'Выберите хотя бы одного пользователя');
            return;
        }

        invitedUserIds = selectedIds;

        useToast('success', 'Участники добавлены');
        inviteBox.remove();
    };

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'close';
    closeBtn.classList.add('invite-close-button');
    closeBtn.addEventListener('click', () => inviteBox.remove());

    form.appendChild(closeBtn);
    inviteBox.appendChild(form);
    document.querySelector('.content').appendChild(inviteBox);
}

function setupFormHandler() {
    const form = document.getElementById('my-form');
    form.onsubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const projectName = formData.get('project_name')?.toString().trim();
        const projectDisplayName = formData.get('project_display_name')?.toString().trim();
        const sectionName = formData.get('section_name')?.toString().trim();
        const taskName = formData.get('task_name')?.toString().trim();
        const taskTitle = formData.get('task_title')?.toString().trim();

        if (!projectName || !projectDisplayName || !sectionName || !taskName || !taskTitle) {
            useToast('error', 'Пожалуйста, заполните все обязательные поля');
            return;
        }

        const selectedIds = new Set([
            ...formData.getAll('participants'),
            ...invitedUserIds
        ]);

        if (selectedIds.size === 0) {
            useToast('error', 'Добавьте хотя бы одного участника');
            return;
        }

        const participants = allUsers
            .filter(user => selectedIds.has(String(user._id)))
            .map(user => ({
                userId: user._id,
                userName: user.username || user.email || '',
                userDisplayName: user.displayName || ''
            }));

        if (participants.length === 0) {
            useToast('error', 'Не удалось найти выбранных участников');
            return;
        }

        const project = {
            name: projectName,
            displayName: projectDisplayName,
            participants,
            sections: [
                {
                    title: sectionName,
                    tasks: [
                        {
                            title: taskTitle,
                            name: taskName
                        }
                    ]
                }
            ]
        };

        const token = cookie.getCookie('accessToken');
        try {
            overlay.classList.remove('hidden'); 

            const response = await axios.post(import.meta.env.VITE_API_URL + '/projects', project, {
                headers: { Authorization: `Bearer ${token}` }
            });

            useToast('success', 'Проект успешно создан!');

            const sidebar = document.querySelector('.sidebar');
            const addButton = sidebar.querySelector('.participant_add');

            if (sidebar && addButton && projectDisplayName) {
                const shortcut = document.createElement('div');
                shortcut.classList.add('project-shortcut');
                shortcut.textContent = projectDisplayName.charAt(0).toUpperCase();
                sidebar.insertBefore(shortcut, addButton); 
            }

            form.remove();
            console.log('Ответ сервера:', response.data);
        } catch (error) {
            console.error('Ошибка при создании проекта:', error.response?.data || error.message);
            useToast('error', 'Ошибка при создании проекта: ' + (error.response?.data?.message || error.message));
        } finally {
            overlay.classList.add('hidden'); 
        }
    };
}

try {
    buildLayout();
} catch (error) {
    console.error('Ошибка при загрузке:', error);
} finally {
    overlay.classList.add('hidden');
}
