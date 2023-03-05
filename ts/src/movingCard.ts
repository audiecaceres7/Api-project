export function isActive(elm: any) {
    if (!elm.classList.contains('active')) {
        elm.classList.add('active');
    } else {
        elm.classList.remove('active');
    }
}

