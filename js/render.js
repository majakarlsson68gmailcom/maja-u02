
export function renderCVList(items, listElement){
    const cvItemTemplate = document.querySelector("#cv-item-template");
    const itemsToRender = items.map(( {
        organization, 
        type,
        title,
        description,
        start,
        end,
        location
    }) => {
        const clone = cvItemTemplate.content.cloneNode(true);

        clone.querySelector(".cv-item-organisation").textContent = organization;
        clone.querySelector(".cv-item-title").textContent = title;
        clone.querySelector(".cv-item-description").textContent = description;

       // const endDate = end ?? "Present"
       // clone.querySelector(".cv-item-time").textContent = `${start} - ${endDate}`;

       clone.querySelector(".cv-item-time").textContent = formatPeriod(start, end);
        clone.querySelector(".cv-item-location-text").textContent = location;

        const pill = clone.querySelector(".cv-item-type");
        if(type){
            pill.textContent = type;
        } else {
            pill.remove();
        }

        

        return clone;
    })

    listElement.append(...itemsToRender)
}

// kan behövas exporteras om jag ska använda göra en utils.js
function formatPeriod(start, end){
    if(start === end) return start;
    
    if(!end) return `${start} - Present`;
    
    return `${start} - ${end}`;
    
}

