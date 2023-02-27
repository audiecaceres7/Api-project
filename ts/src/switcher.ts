export function switcher(elm: any) {
    if (!elm.classList.contains('active')) {
        elm.classList.add('active')
    }
}

export function switcherTwo(elm: any) {
    if (elm.classList.contains('active')) {
        elm.classList.remove('active')
    }
}

