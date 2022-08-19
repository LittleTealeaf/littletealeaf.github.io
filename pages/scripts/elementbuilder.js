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

function createElement({id, node="div", classNames, content, src, href, onclick, alt} = values) {
    const element = document.createElement(node);
    id && (element.id = id);
    classNames && element.classList.add(classNames);
    if(content) {
        try {
            if(typeof(content) === "string") {
                element.innerText = content;
            } else {
                element.append(...content);
            }
        } catch(e) {
            element.append(content);
        }
    }
    src && (element.src = src);
    alt && (element.alt = alt);
    href && (element.href = href);

    onclick && (element.onclick = onclick);


    return element;
}
