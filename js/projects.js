import { loadRepos, loadImages } from "./api.js";
import { renderList, createProjectCards } from "./render.js";

const projectContainer = document.querySelector(".grid-container");

export async function initProjects() {
    if(!projectContainer) return;
    try {
        const [ repos, images ] = await Promise.all([loadRepos(), loadImages()]);

        if(repos.length === 0) {
            // Lägg till ett riktigt meddalnde som visas i DOMen
            console.log("inga projekt ännu");
        }
        renderList(repos, projectContainer, repo => createProjectCards(repo, images));
        console.log(repos, images)
    } catch (error) {
        console.error(error)
    }
    
}