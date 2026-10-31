// Value är en sträng från data-filter
export function filterProjects(projects, value) {
  return projects.filter((project) => matchesFilter(project, value));
}

function matchesFilter(project, value) {
  if (value === "all") return true;
  if (value === "my-pick") return project.isMyPick;
  if (value === "ux-design") return project.topics.includes("ux-design");
  if (value === "development") return !project.topics.includes("ux-design");
  return false;
}
