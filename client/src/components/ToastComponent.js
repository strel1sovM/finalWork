export function ErrorToast(msg) {
    const div = document.createElement('div');
    const message = document.createElement('p');

    div.classList.add('toast', 'error');

    message.innerHTML = msg;

    div.append(message);

    return div;
}

export function SuccessToast(msg) {
    const div = document.createElement('div');
    const message = document.createElement('p');

    div.classList.add('toast', 'success');

    message.innerHTML = msg;

    div.append(message);

    return div;
}


