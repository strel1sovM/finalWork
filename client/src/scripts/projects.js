
import '../assets/default.css';
import '../assets/projects.css';
import axios from 'axios';
import { cookie } from '../utils/cookie';
import { useToast } from '../utils/hooks';

const loader = document.querySelector('#loader-overlay');

function renderProjects(projects, currentUserId) {
    const container = document.getElementById('app');


    if (!container) {
        console.error('[renderProjects]  Контейнер #app не найден');
        return;
    }

    container.innerHTML = '';

    if (!projects || projects.length === 0) {
        container.textContent = 'Проекты не найдены.';
        return;
    }

    projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project';

        const title = document.createElement('h3');
        title.textContent = `Название: ${project.name || 'Без имени'}`;
        div.appendChild(title);

        const participants = document.createElement('p');
        const participantNames = project.participants?.map(p =>
            p.userDisplayName || p.userName || 'Unknown'
        ).join(', ') || 'Нет участников';
        participants.innerHTML = `<strong>Участники:</strong> ${participantNames}`;
        div.appendChild(participants);

        project.sections?.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'section';

            const sectionTitle = document.createElement('h4');
            sectionTitle.textContent = section.title || 'Без названия раздела';
            sectionDiv.appendChild(sectionTitle);

            const taskList = document.createElement('ul');
            section.tasks?.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `${task.title || 'Без названия задачи'} — <em>${task.priority || 'без приоритета'}</em>`;
                taskList.appendChild(li);
            });

            sectionDiv.appendChild(taskList);
            div.appendChild(sectionDiv);
        });

        container.appendChild(div);
    });
}

async function loadProjects() {
    try {
        const token = cookie.getCookie('accessToken');
        if (!token) {
            useToast('error', 'Вы не авторизованы');
            window.location.href = '/signin';
            return;
        }

        const res = await axios.get(import.meta.env.VITE_API_URL + '/projects', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = res.data;
       

        const currentUserId = data?.userId || ''; 
        renderProjects(data.projects || [], currentUserId);

    } catch (err) {
        console.error('[loadProjects]  Ошибка при получении проектов:', err);
        useToast('error', 'Ошибка загрузки проектов');
    } finally {
        loader?.classList.add('hidden');
    }
}

loadProjects();
