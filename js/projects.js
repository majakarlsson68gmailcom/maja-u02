import { loadRepos, loadImages } from "./api.js";
import { renderList, createProjectCards, renderSkeletons } from "./render.js";

const projectContainer = document.querySelector(".project-card-container");
const projectsError = document.querySelector("#projects-error");
const projectsEmpty = document.querySelector(".projects-empty");

export async function initProjects() {
  if (!projectContainer) return;

  projectsError
    .querySelector(".retry-button")
    .addEventListener("click", loadProjects);

  loadProjects();
}

async function loadProjects() {
  projectsError.hidden = true;
  projectsEmpty.hidden = true;
  renderSkeletons(projectContainer, "#project-skeleton-template", 3);

  try {
    const [repos, images] = await Promise.all([loadRepos(), loadImages()]);

    const projects = repos.filter((repo) => repo.description);

    if (projects.length === 0) {
        projectContainer.replaceChildren();
        projectsEmpty.hidden = false;
        return;
    }

    renderList(projects, projectContainer, (repo) =>
      createProjectCards(repo, images),
    );
  } catch (error) {
    console.error(error);
    projectContainer.replaceChildren();
    projectsError.hidden = false;
  }
}
