import { loadCV } from "./api.js";
import { renderList, createCvItem, renderSkeletons } from "./render.js";

const cvListWork = document.querySelector(".cv-list-work");
const cvListEducation = document.querySelector(".cv-list-education");
const cvLists = document.querySelector(".cv-lists");
const cvError = document.querySelector("#cv-error");

export async function initCV() {
  if (!cvListWork || !cvListEducation) return;

  cvError.querySelector(".retry-button").addEventListener("click", loadCvLists);

  loadCvLists();
}

async function loadCvLists() {
  cvError.hidden = true;
  cvLists.hidden = false;
  renderSkeletons(cvListWork, "#cv-skeleton-template", 2);
  renderSkeletons(cvListEducation, "#cv-skeleton-template", 2);

  try {
    const cvData = await loadCV();
    renderList(cvData.jobs, cvListWork, createCvItem);
    renderList(cvData.education, cvListEducation, createCvItem);
  } catch (error) {
    console.error(error);
    cvLists.hidden = true;
    cvError.hidden = false;
  }
}
