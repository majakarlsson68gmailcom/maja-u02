import { loadCV } from "./api.js";
import { renderList, createCvItem } from "./render.js";

const cvListWork = document.querySelector(".cv-list-work");
const cvListEducation = document.querySelector(".cv-list-education");

export async function initCV() {
    if(!cvListWork || !cvListEducation) return;
    try {
        const cvData = await loadCV();

        renderList(cvData.jobs, cvListWork, createCvItem);
        renderList(cvData.education, cvListEducation, createCvItem);
        
    } catch (error) {
        console.error(error)
    }
}