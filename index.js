
import { loadCV } from "./js/api.js";
import { renderCVList } from "./js/render.js";
import { initNav } from "./js/nav.js";
import { initTheme } from "./js/theme.js";


initNav();
initTheme();



// Hämta data och rendera lista på about me
const cvListWork = document.querySelector(".cv-list-work");
const cvListEducation = document.querySelector(".cv-list-education");

async function init() {
    try {
        const cvData = await loadCV();
        renderCVList(cvData.jobs, cvListWork);
        renderCVList(cvData.education, cvListEducation);
        
    } catch (error) {
        console.error(error)
    }
}

// Ta bort denna sen och dela i moduler
if (cvListWork) init();