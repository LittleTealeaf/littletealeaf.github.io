function details({title, content}) {
  // TODO rewrite this so that it allow for width changes as well as height changes (so we can make the header any size we want)

  /** @type {Element} */
  const root = render({
    classList: ["details"],
    children: [
      {
        classList: ["details_header"],
        text: title,
      },
      {
        classList: ["details_content"],
        children: [render(content)],
      },
    ],
  });

  function updateContainerSize() {
    if (root.classList.contains("--open")) {
      element_content_container.style.height = element_content.offsetHeight + "px";
    } else {
      element_content_container.style.height = 0;
    }
  }

  const element_header = root.querySelector(".details_header");
  const element_content_container = root.querySelector(".details_content");
  const element_content = root.querySelector(".details_content > *");
  element_header.onclick = () => {
    root.classList.toggle("--open");
    updateContainerSize();
  };

  const resize_observer = new ResizeObserver(updateContainerSize);
  resize_observer.observe(root);

  registerCleanupScript(() => {
    resize_observer.disconnect();
  });

  return root;
}

function button({text, onclick}) {
  return render({
    classList: ["button"],
    text,
    onclick,
  });
}

function image({ src, onclick, content }) {
  return render({
    classList: ["image"],
    onclick,
    style: {
      backgroundImage: `url(${src})`,
    },
    children: [
      content && {
        classList: ["image__overlay"],
        children: content,
      },
    ],
  });
}
