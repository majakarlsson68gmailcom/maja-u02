import { loadRepos, loadProjectMeta } from "./api.js";
import { renderList, createProjectCards, renderSkeletons } from "./render.js";

const projectContainer = document.querySelector(".project-card-container");
const projectsError = document.querySelector("#projects-error");
const projectsEmpty = document.querySelector(".projects-empty");

let allProjects = [];

export async function initProjects() {
  if (!projectContainer) return;

  projectsError
    .querySelector(".retry-btn")
    .addEventListener("click", loadProjects);

  loadProjects();
}

async function loadProjects() {
  projectsError.hidden = true;
  projectsEmpty.hidden = true;
  renderSkeletons(projectContainer, "#project-skeleton-template", 3);

  try {
    const [repos, meta] = await Promise.all([loadRepos(), loadProjectMeta()]);

    const projects = repos
    .filter((repo) => repo.description)
    .map((repo) => {
      const moreInfo = meta[repo.name];
      return {
        ...repo, // Kopiera allt från repo med spread
        isMyPick: moreInfo?.isMyPick ?? false, // finns is isMyPick? annars sätt till false
        image: moreInfo?.image ?? meta.placeholder,
      }
    });

    allProjects = projects;

    if (projects.length === 0) {
        projectContainer.replaceChildren();
        projectsEmpty.hidden = false;
        return;
    }

    renderList(projects, projectContainer, (repo) =>
      createProjectCards(repo),
    );
  } catch (error) {
    console.error(error);
    projectContainer.replaceChildren();
    projectsError.hidden = false;
  }
}
