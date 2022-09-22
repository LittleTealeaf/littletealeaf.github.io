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

  if(node.html) {
    element.innerHTML = node.html
  }

  if(node.attributes) {
    for(const [key, value] of Object.entries(node.attributes)) {
      element.setAttribute(key, value);
    }
  }

  if(node.style) {
    for(const [key, value] of Object.entries(node.style)) {
      element.style[key] = value;
    }
  }



  return element;


}
