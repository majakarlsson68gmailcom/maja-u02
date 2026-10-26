
export function renderList(items, container, createItem){
    container.replaceChildren(...items.map(createItem));
}

function formatPeriod(start, end){
    if(start === end) return start;
    
    if(!end) return `${start} - Present`;
    
    return `${start} - ${end}`;
    
}


export function createProjectCards( { name, description, topics = [], homepage, html_url }, images ){
    const projectTemplate = document.querySelector("#project-card-template");
    const clone = projectTemplate.content.cloneNode(true);

    const imgElement = clone.querySelector(".project-image");
    const img = images[name] ?? images.placeholder;

    imgElement.src = img.src;
    imgElement.alt = img.alt;

    const title = name.replaceAll("-", " ");
    clone.querySelector(".project-card-title").textContent = title;
    clone.querySelector(".project-description").textContent = description;

    const pillContainer = clone.querySelector(".pill-container");
    topics.forEach(topic => {
        const pill = document.createElement("span");
        pill.className = "pill";
        pill.textContent = topic;
        pillContainer.append(pill);
    });

    const githubLink = clone.querySelector(".github-link");
    githubLink.href = html_url;

    const previewLink = clone.querySelector(".live-preview-link");
    if(homepage) {
        previewLink.href = homepage;
    } else {
        previewLink.remove();
    }

    return clone;
}

export function createCvItem({organization, type, title, description, start, end, location }){
    const cvItemTemplate = document.querySelector("#cv-item-template");
    const clone = cvItemTemplate.content.cloneNode(true);

    clone.querySelector(".cv-item-organisation").textContent = organization;
    clone.querySelector(".cv-item-title").textContent = title;
    clone.querySelector(".cv-item-description").textContent = description;

    
    clone.querySelector(".cv-item-time").textContent = formatPeriod(start, end);
     clone.querySelector(".cv-item-location-text").textContent = location;

     const pill = clone.querySelector(".cv-item-type");
     if(type){
         pill.textContent = type;
     } else {
         pill.remove();
     }

     return clone;
}

export function renderSkeletons(container, templateSelector, count) {
    const template = document.querySelector(templateSelector);
    const clone = template.content.cloneNode(true);
    container.replaceChildren();

    for (let i = 0; i < count; i++) {
        container.append(clone);
    }
}