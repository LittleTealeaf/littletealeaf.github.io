function render_dom(node, amp_replace = "&") {
  if (node instanceof Element) {
    return node;
  }

  if (!node) {
    return undefined;
  }

  const amp = node.amp ? node.amp.replace("&", amp_replace) : amp_replace;

  if (node.component) {
    return {
      details,
      button,
      image,
    }[node.component](node, amp);
  }

  /** @type {Element} */
  const element = document.createElement(node.tag || "div");

  if (node.classList) {
    if (typeof node.classList === "string") {
      element.classList.add(node.classList.replace("&", amp));
    } else {
      element.classList.add(...node.classList.map((c) => c.replace("&", amp)));
    }
  }

  if (node.children) {
    element.append(...node.children.filter((child) => child).map((child) => render_dom(child, amp)));
  }

  if (node.text) {
    element.innerText = node.text;
  }

  if (node.html) {
    element.innerHTML = node.html;
  }

  if (node.attributes) {
    Object.entries(node.attributes).forEach(([key, value]) => element.setAttribute(key, value));
  }

  if (node.style) {
    Object.entries(node.style).forEach(([key, value]) => (element.style[key] = value));
  }

  if (node.data) {
    Object.entries(node.data).forEach(([key, value]) => (element.dataset[key] = value));
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
