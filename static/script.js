const closeMenuBtn = document.querySelector("#close")
const menu = document.querySelector("#menu");
const mediaQuery = window.matchMedia("(min-width: 56rem)");
const openMenuBtn = document.querySelector("#menu-button");

const focusTrap = createFocusTrap(menu);

let menuToggled = false;
let scrollY = 0;

document.addEventListener("DOMContentLoaded", init);


function closeMenu() {
    menu.classList.remove("open");
    menuToggled = false;
    focusTrap.deactivate();
    openMenuBtn.focus();
    openMenuBtn.setAttribute("aria-expanded", "false");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
}

function createFocusTrap(element) {
    const selector = "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])";

    function trapFocusListener(e) {
        if (e.key !== "Tab") return;

        const focusableElements = element.querySelectorAll(selector)
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    return {
        activate() {
            element.addEventListener("keydown", trapFocusListener);
        },
        deactivate() {
            element.removeEventListener("keydown", trapFocusListener);
        },
    };
}

function init() {
    openMenuBtn.addEventListener("click", openMenu);

    closeMenuBtn.addEventListener("click", closeMenu);
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
    if (!mediaQuery.matches) {
        focusTrap.activate();
    }
    closeMenuBtn.focus();
    openMenuBtn.setAttribute("aria-expanded", "true");

    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
}
