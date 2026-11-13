
async function fetchData(url, timeout = 8000) {
    const response = await fetch(url, { signal: AbortSignal.timeout(timeout)});
    if(!response.ok) throw new Error(`Kunde inte hämta ${url}: ${response.status}`);
    return response.json();
}


export const loadCV = () => fetchData(new URL("/data/cv.json", import.meta.url));

export const loadRepos = () => fetchData("https://api.github.com/users/majaKarlsson-mk/repos?sort=pushed&direction=desc");

export const loadProjectMeta = () => fetchData(new URL("/data/projects.json", import.meta.url));