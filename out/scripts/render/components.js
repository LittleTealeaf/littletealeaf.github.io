function component_details(title, content) {
  // TODO rewrite this so that it allow for width changes as well as height changes (so we can make the header any size we want)

  const root = render_dom({
    classList: ["details"],
    children: [
      {
        classList: ["details_header"],
        text: title,
      },
      {
        classList: ["details_content"],
        children: [render_dom(content)],
      },
    ],
  });

  const element_header = root.querySelector(".details_header");
  const element_content_container = root.querySelector(".details_content");
  const element_content = root.querySelector(".details_content > *");
  element_header.onclick = () => {
    root.classList.toggle("--open");
    if (root.classList.contains("--open")) {
      element_content_container.style.height = element_content.offsetHeight + "px";
    } else {
      element_content_container.style.height = 0;
    }
  };
  return root;
}

function component_button(text, onclick) {
  return render_dom({
    classList: ["button"],
    text,
    onclick,
  });
}

function component_image({ src, onclick, content }) {
  return render_dom({
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
