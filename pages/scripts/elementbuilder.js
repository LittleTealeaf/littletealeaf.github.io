function createElementOld(data = {
    node: "div",
    classNames: [],
    content: undefined,
}) {
    const element = document.createElement(data.node);
    element.classList.add(...(data.classNames || []));
    element.append(...data.content);
    return element;
}

function createElement({id, node="div", classNames, content, src, onclick, alt} = values) {
    const element = document.createElement(node);
    id && (element.id = id);
    classNames && element.classList.add(classNames);
    if(content) {
        if(typeof(content) === "string") {
            element.innerText = content;
        } else {
            element.append(...content);
        }
    }
    src && (element.src = src);
    alt && (element.alt = alt);

    onclick && (element.onclick = onclick);


    return element;
}
