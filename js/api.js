export async function loadCV(){
    const response = await fetch(new URL("/data/cv.json", import.meta.url));

    if(!response.ok) {
        throw new Error(`Gick inte att hämta filen: ${response.status}`);
    }

    const cv = await response.json();
    return cv;
}

export async function loadRepos() {
    const response = await fetch("https://api.github.com/users/majakarlsson68gmailcom/repos");

    if(!response.ok) {
        throw new Error(`Gick inte att hämta repositories från github api: ${response.status}`);
    }

    const repos = await response.json();
    return repos;
}

export async function loadImages() {
    const response = await fetch("/data/projects.json");

    if(!response.ok) {
        throw new Error(`Gick inte att hämta bilderna: ${response.status}`);
    }

    const images = await response.json();
    return images;
}