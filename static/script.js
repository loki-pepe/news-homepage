const closeMenuBtn = document.querySelector("#close")
const menu = document.querySelector("#menu");
const mediaQuery = window.matchMedia("(min-width: 56rem)");
const openMenuBtn = document.querySelector("#menu-button");

let menuToggled = false;
let scrollY = 0;

document.addEventListener("DOMContentLoaded", init);


function closeMenu() {
    menu.classList.remove("open");
    menuToggled = false;
    openMenuBtn.focus();

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
}

function init() {
    closeMenuBtn.addEventListener("click", closeMenu);
    openMenuBtn.addEventListener("click", openMenu);
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && menuToggled) closeMenu();
    });
    document.addEventListener("click", e => {
       if (e.target.classList.contains("overlay")) closeMenu();
    });
    window.addEventListener("resize", () => {
        if (mediaQuery.matches && menuToggled) closeMenu();
    });
}

function openMenu() {
    menu.classList.add("open");
    menuToggled = true;
    closeMenuBtn.focus();

    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
}
