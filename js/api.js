export async function loadCV(){
    const response = await fetch(new URL("../cv.json", import.meta.url));

    if(!response.ok) {
        throw new Error(`Gick inte att hämta filen: ${response.status}`);
    }

    const cv = await response.json();
    return cv;
}

export async function loadRepos() {
    
}

export async function loadImages() {
    
}