export function render(arr, place, component) {
    place.innerHTML = '';

    for (const item of arr) {
        let elem = component(item);
        place.append(elem);
    };
};

export function renderToast(place, component, item) {
    let elem = component(item);
    place.append(elem);

    setTimeout(() => {
        elem.classList.add('open');
    }, 200)

    setTimeout(() => {
        elem.classList.remove('open');
    }, 3000)
    setTimeout(() => {

    }, 3300);
    setTimeout(() => {
        place.removeChild(elem);
    }, 3300)
};