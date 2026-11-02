import { loadRepos, loadProjectMeta } from "./api.js";
import { renderList, createProjectCards, renderSkeletons } from "./render.js";
import { filterProjects } from "./filter.js";

const projectContainer = document.querySelector(".project-card-container");
const projectsError = document.querySelector("#projects-error");
const projectsEmpty = document.querySelector(".projects-empty");
const filterBar = document.querySelector(".filter-bar");
const filterStatusEl = document.querySelector(".filter-status");
const statusEmpty = document.querySelector(".filter-empty");

let allProjects = [];

export async function initProjects() {
  if (!projectContainer) return;

  projectsError
    .querySelector(".retry-btn")
    .addEventListener("click", loadProjects);

  filterBar.addEventListener("click", handleFilterClick);

  loadProjects();
}

async function loadProjects() {
  projectsError.hidden = true;
  projectsEmpty.hidden = true;
  renderSkeletons(projectContainer, "#project-skeleton-template", 3);
  filterBar.disabled = true;

  try {
    const [repos, meta] = await Promise.all([loadRepos(), loadProjectMeta()]);

    const projects = repos
      .filter((repo) => repo.description)
      .map((repo) => {
        const moreInfo = meta[repo.name];
        return {
          ...repo, // Kopiera allt från repo med spread
          topics: repo.topics ?? [], // Skydd om repo saknar topics
          isMyPick: moreInfo?.isMyPick ?? false, // finns is isMyPick? annars sätt till false
          image: moreInfo?.image ?? meta.placeholder,
        };
      });

    allProjects = projects;

    if (projects.length === 0) {
      projectContainer.replaceChildren();
      projectsEmpty.hidden = false;
      return;
    }
    renderProjects(allProjects);
    filterBar.disabled = false;
   
  } catch (error) {
    console.error(error);
    projectContainer.replaceChildren();
    projectsError.hidden = false;
    filterBar.hidden = true;
  }
}

function handleFilterClick(e) {
  const button = e.target.closest(".filter-pill");
  if (!button) return;

  filterBar
    .querySelectorAll(".filter-pill")
    .forEach((pill) => pill.setAttribute("aria-pressed", "false"));

  button.setAttribute("aria-pressed", "true");

  const filtered = filterProjects(allProjects, button.dataset.filter);
  renderProjects(filtered);
}

function renderProjects(projects){
  renderList(projects, projectContainer, (repo) => createProjectCards(repo));
  
  filterStatusEl.textContent = `Showing ${projects.length} ${projects.length === 1 ? "project" : "projects"}`;
  statusEmpty.hidden = projects.length > 0;
}