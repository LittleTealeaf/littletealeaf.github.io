function render_dom(node) {

  const element= document.createElement(node.node || "div");
  if(node.classList) {
    element.classList.add(...node.classList);
  }

  if(node.children) {
    element.append(...node.children.map(render_dom));
  }

  if(node.text) {
    element.innerText = node.text
  }

  return element;


}
