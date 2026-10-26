
async function fetchData(url) {
    const response = await fetch(url);
    if(!response.ok) throw new Error(`Kunde inte hämta ${url}: ${response.status}`);
    return response.json();
}


export const loadCV = () => fetchData(new URL("/data/cv.json", import.meta.url));

export const loadRepos = () => fetchData("https://api.github.com/users/majaarlsson68gmailcom/repos");

export const loadImages = () => fetchData(new URL("/data/projects.json", import.meta.url));