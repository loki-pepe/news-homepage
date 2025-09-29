const closeMenuBtn = document.querySelector("#close")
const menu = document.querySelector("#menu");
const mediaQuery = window.matchMedia("(min-width: 56rem)");
const openMenuBtn = document.querySelector("#menu-button");

let menuToggled = false;

document.addEventListener("DOMContentLoaded", init);


function closeMenu() {
    menu.classList.remove("open");
    menuToggled = false;
    openMenuBtn.focus();
}

function init() {
    closeMenuBtn.addEventListener("click", closeMenu);
    openMenuBtn.addEventListener("click", openMenu);
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && menuToggled) closeMenu();
    });
    document.addEventListener("click", e => {
        if (!menu.contains(e.target)
            && !closeMenuBtn.contains(e.target)
            && !openMenuBtn.contains(e.target)
            && menuToggled
        ) {
            closeMenu();
        }
    });
    window.addEventListener("resize", () => {
        if (mediaQuery.matches && menuToggled) closeMenu();
        console.log(document.activeElement)
    });
}

function openMenu() {
    menu.classList.add("open");
    menuToggled = true;
    closeMenuBtn.focus();
}
