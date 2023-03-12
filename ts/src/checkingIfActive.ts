export function isActive(elm: any, selector: string) {
    if (document.querySelector(`${selector}.is-active`) !== null) {
        document.querySelector(`${selector}.is-active`)?.classList.remove('is-active');
    };
    elm.classList.add('is-active');
};