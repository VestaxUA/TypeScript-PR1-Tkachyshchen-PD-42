export function openMenu(evt, menuName) {
    const x = document.getElementsByClassName("menu");
    const tablinks = document.getElementsByClassName("tablink");
    const targetMenu = document.getElementById(menuName);
    if (!targetMenu) {
        console.error(`Menu with id "${menuName}" not found.`);
        return;
    }
    for (let i = 0; i < x.length; i++) {
        const menuItem = x[i];
        menuItem.style.display = "none";
    }
    for (let i = 0; i < tablinks.length; i++) {
        const tablinkItem = tablinks[i];
        tablinkItem.className = tablinkItem.className.replace(" w3-red", "");
    }
    targetMenu.style.display = "block";
    evt.currentTarget.className += " w3-red";
}
