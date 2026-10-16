
const rootElement = document.documentElement;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function getCurrentTheme() {
    const userChoice = localStorage.getItem("theme");

    if (userChoice) return userChoice;
    return prefersDark.matches ? "dark" : "light";
    
}

function setTheme(theme, toggleBtn){
    rootElement.dataset.theme = theme;
    if (toggleBtn) {
        toggleBtn.setAttribute("aria-pressed", theme === "dark");
    }
}

 export function initTheme(){
    const toggleBtn = document.querySelector(".darkmode-toggle");

    setTheme(getCurrentTheme(), toggleBtn);

    // koppla bara om knappen finns
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        const newTheme = getCurrentTheme() === "dark" ? "light" : "dark";
        setTheme(newTheme, toggleBtn);
        localStorage.setItem("theme", newTheme);
    })
}



// const currentTheme = getCurrentTheme();
// setTheme(currentTheme);