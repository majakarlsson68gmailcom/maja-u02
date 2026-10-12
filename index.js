const toggle = document.querySelector(".nav-toggle");
const navContainer = document.querySelector(".nav-container");
const navLinks = document.querySelectorAll(".nav-list a");

toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isOpen));
    navContainer.classList.toggle("is-open");

})

// Stäng naven när man klickar på projects (sidan laddas inte om)
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        navContainer.classList.remove("is-open");
    })
})

// darkmode
const toggleBtn = document.querySelector(".darkmode-toggle");
const rootElement = document.documentElement;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark");

function getCurrentTheme() {
    const userChoice = localStorage.getItem("theme");

    if (userChoice) return userChoice;
    return prefersDark.matches ? "dark" : "light";
    
}

function setTheme(theme){
    rootElement.dataset.theme = theme;
    toggleBtn.setAttribute("aria-pressed", theme === "dark");
}

toggleBtn.addEventListener("click", () => {
    const newTheme = getCurrentTheme() === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
})

const currentTheme = getCurrentTheme();
setTheme(currentTheme);