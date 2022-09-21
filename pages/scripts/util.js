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

  if (content != null) {
    if (typeof content == "string") {
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

function elementsOverlap(el1, el2) {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}
