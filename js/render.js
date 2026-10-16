const cvItemTemplate = document.querySelector("#cv-item-template");

export function renderCVList(items, listElement){
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
        clone.querySelector(".cv-item-time").textContent = `${start} - ${end}`;
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
