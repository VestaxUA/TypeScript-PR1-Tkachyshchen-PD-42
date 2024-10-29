export function openMenu(evt: MouseEvent, menuName: string): void {
    const x = document.getElementsByClassName("menu") as HTMLCollectionOf<HTMLElement>;
    const tablinks = document.getElementsByClassName("tablink") as HTMLCollectionOf<HTMLElement>;

    const targetMenu = document.getElementById(menuName);
    if (!targetMenu) {
        console.error(`Menu with id "${menuName}" not found.`);
        return;
    }

    for (let i = 0; i < x.length; i++) {
        const menuItem = x[i] as HTMLElement;
        menuItem.style.display = "none";
    }

    for (let i = 0; i < tablinks.length; i++) {
        const tablinkItem = tablinks[i] as HTMLElement;
        tablinkItem.className = tablinkItem.className.replace(" w3-red", "");
    }

    targetMenu.style.display = "block";
    (evt.currentTarget as HTMLElement).className += " w3-red";
}