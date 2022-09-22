function render_dom(data) {
  const container = document.createElement("div");
  container.classList.add("dom_render");


  function renderElement(node) {
    const element = document.createElement(node.node || "div");

    if(node.classList) {
      element.classList.add(...node.classList);
    }

    if(node.children) {
      element.append(...node.children.map(renderElement));
    }

    if(node.text) {
      element.innerText = node.text
    }


    return element;


  }


  container.append(...data.map(renderElement));




  return container;

}
