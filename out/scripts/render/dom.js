function render(node) {
  if (node instanceof Element) {
    return node;
  }

  if (!node) {
    return undefined;
  }

  const element = document.createElement(node.tag || "div");
  if (node.classList) {
    element.classList.add(...node.classList);
  }

  if (node.children) {
    element.append(...node.children.filter((child) => child).map(render));
  }

  if (node.text) {
    element.innerText = node.text;
  }

  if (node.html) {
    element.innerHTML = node.html;
  }

  if (node.attributes) {
    for (const [key, value] of Object.entries(node.attributes)) {
      element.setAttribute(key, value);
    }
  }

  if (node.style) {
    for (const [key, value] of Object.entries(node.style)) {
      element.style[key] = value;
    }
  }

  if (node.data) {
    for (const [key, value] of Object.entries(node.data)) {
      element.dataset[key] = value;
    }
  }

  if (node.onclick) {
    element.onclick = node.onclick;
  }

  // include img src
  if (node.src) {
    element.src = node.src;
  }

  if (node.href) {
    element.href = node.href;
  }

  if (node.target) {
    element.target = node.target;
  }

  return element;
}
