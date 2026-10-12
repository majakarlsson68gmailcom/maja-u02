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