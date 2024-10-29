import { openMenu } from './menu';

const tabLinks = document.querySelectorAll<HTMLElement>('.tablink');

tabLinks.forEach(link => {
    link.onclick = (evt: MouseEvent) => {
        const menuName = link.innerText;
        openMenu(evt, menuName);
    };
});


