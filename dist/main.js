import { openMenu } from './menu';
const tabLinks = document.querySelectorAll('.tablink');
tabLinks.forEach(link => {
    link.onclick = (evt) => {
        const menuName = link.innerText;
        openMenu(evt, menuName);
    };
});
