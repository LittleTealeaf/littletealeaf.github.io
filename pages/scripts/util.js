async function promiseJson(response) {
  return response.json();
}

function createElement(params) {
  let { node = "div", classNames = null, content = null, dataset = null, ...props } = params;

  if (classNames) {
    if (classNames.constructor === Array) {
      element.classList.add(...classNames);
    } else {
      element.classList.add(classNames);
    }
  }

  const element = document.createElement(node);

  if (dataset && typeof dataset === "object") {
    Object.entries(dataset).forEach(([key, value]) => (element.dataset[key] = value));
  }

  if (content) {
    if (typeof content === "string") {
      element.innerText = content;
    } else if (content.constructor === Array) {
      element.append(...content);
    } else {
      element.append(content);
    }
  }

  Object.entries(props).forEach(([key, value]) => (element[key] = value));

  return element;
}
