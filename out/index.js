const BODY = document.querySelector("body");
const PAGE = document.querySelector("#page");
const TABS = document.querySelector("#tabs");

/**
 * Sets whether the drawer should be open or closed
 * @param {*} open
 */
function setDrawer(open) {
  BODY.dataset.drawer = open;
}

// Updates the drawer_toggle to open the drawer
document.querySelector("#drawer_toggle").addEventListener("click", (_) => setDrawer(true));

// Updates the .action_close_drawer to close the drawer
document.querySelectorAll("#drawer .action_close_drawer").forEach((element) => element.addEventListener("click", (_) => setDrawer(false)));

function renderPage(tab) {

  if(!tab) {
    tab = document.querySelector("#tabs .tab");

    console.log(tab);
  }

  const previous = document.querySelector("#tabs .tab.selected");
  if (previous) {

    if(tab === previous) {
      return;
    }

    previous.classList.remove("selected");
  }

  PAGE.innerHTML = "";

  if(!tab) return;

  tab.classList.add("selected");

  const { source, renderer } = tab.dataset;
  const data = fetch(source).then((response) => response.json());

  if (renderer === "dom") {
    data.then((data) => PAGE.append(render_dom(data)));
  } else if(renderer === "project") {
    data.then((data) => PAGE.append(render_project(data)));
  } else if(renderer === 'project-list') {
    data.then((data) => PAGE.append(render_project_list(data)));
  }
}

// Loads a page as a tab when the node in the explorer is clicked
function openNode(node) {
  renderPage(document.querySelector(`#tabs .tab[data-name='${node.name}']`) || (() => {
    const tab = document.createElement("div");

    tab.dataset.name = node.name;
    tab.dataset.source = node.source;
    tab.dataset.renderer = node.renderer;
    tab.classList.add("tab");

    const label_container = document.createElement("div");
    label_container.classList.add("text_container");

    const label = document.createElement("span");
    label.innerText = node.name;
    label_container.append(label);

    const close_container = document.createElement("div");
    close_container.classList.add("text_container", "close_tab");

    const close = document.createElement("span");
    close.classList.add("material-icons");
    close.innerText = "close";
    close.addEventListener("click",(e) => {
      e.stopPropagation();
      const hasSelected = tab.classList.contains("selected");
      tab.remove();
      if(hasSelected) {
        renderPage(null);
      }
    });
    close_container.append(close);

    tab.append(label_container,close_container);
    // Close the tab if the tab is middle clicked
    tab.addEventListener("auxclick", (e) => {
      if (e.button === 1) {
        tab.remove();
        if(tab.classList.contains("selected")) {
          renderPage(null);
        }
      }
    });

    //Render page if clicked
    tab.addEventListener("click",(e) => {
      renderPage(tab);
    })


    TABS.append(tab);
    return tab;
  })());


}

fetch("./resources/pages.json")
  .then((response) => response.json())
  .then((nodes) => {

    const explorer = document.querySelector("#drawer .explorer");

    // Renders each node in the explorer
    function render_node(node, depth) {
      const element = document.createElement("div");
      element.classList.add("node");

      // Add the depth
      if(depth > 0) {
        element.style.paddingLeft = `${depth * 7}px`;
      }

      // Create the label
      const entry = document.createElement("div");
      const icon = document.createElement("div");
      const name = document.createElement("div");
      name.innerText = node.name;
      entry.append(icon,name);
      element.append(entry);

      if(node.type === "folder") {
        // Set to collapse by default
        element.classList.add("collapse");

        // Add the icon
        const icon_chevron = document.createElement("span");
        icon_chevron.classList.add("material-icons");
        icon_chevron.innerText = "chevron_right";
        icon.append(icon_chevron);

        // Add children
        element.append(...node.contents.map((content) => render_node(content,depth + 1)));

        // Add the click event to collapse the folder
        entry.addEventListener("click",(_) => element.classList.toggle("collapse"));
      } else {

        // Element is a page, so clicking should close the drawer and open the page.
        entry.addEventListener("click",(_) => {
          setDrawer(false);
          openNode(node);
        });
      }


      return element;
    }

    explorer.append(...nodes.map((node) => render_node(node, 0)));
    openNode(nodes[0]);
  });
