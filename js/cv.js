import { loadCV } from "./api.js";
import { renderCVList } from "./render.js";

const cvListWork = document.querySelector(".cv-list-work");
const cvListEducation = document.querySelector(".cv-list-education");

export async function initCV() {
    if(!cvListWork || !cvListEducation) return;
    try {
        const cvData = await loadCV();
        renderCVList(cvData.jobs, cvListWork);
        renderCVList(cvData.education, cvListEducation);
        
    } catch (error) {
        console.error(error)
    }
}