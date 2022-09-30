function component_details(title, content) {

  // TODO rewrite this so that it allow for width changes as well as height changes (so we can make the header any size we want)

  const dom = render_dom({
    classList: ["details"],
    children: [
      {
        classList: ["details_header"],
        text: title,
      },
      {
        classList: ["details_content"],
        children: [render_dom(content)]
      }
    ]
  });

  const dom_header = dom.querySelector(".details_header");
  const dom_content_container = dom.querySelector(".details_content");
  const dom_content = dom.querySelector(".details_content > *");
  dom_header.onclick = () => {
    dom.classList.toggle("--open");

    if(dom.classList.contains("--open")) {
      dom_content_container.style.height = dom_content.offsetHeight + "px";
    } else {
      dom_content_container.style.height = 0;
    }

  }




  return dom;
}
