const Body = document.querySelector("body");
const Header = document.querySelector("header");
const Drawer = document.querySelector("#drawer");
const Page = document.querySelector("#page");
const Tabs = document.querySelector("#tabs");

function setDrawer(open) {
  Body.dataset.drawer = open;
}

document.querySelector("#drawer_toggle").addEventListener("click", (_) => setDrawer(true));

document.querySelectorAll("#drawer .action_close_drawer").forEach((element) => element.addEventListener("click", (_) => setDrawer(false)));


function renderNothing() {
  Page.innerHTML = "";
}

function renderPage(tab_element) {

  // document.querySelector("#tabs .tab.selected").classList.remove("selected");
  const previous = document.querySelector("#tabs .tab.selected");
  if(previous) {
    previous.classList.remove("selected");
  }

  const {source, method} = tab_element.dataset;
  tab_element.classList.add("selected");

  Page.innerHTML = "";

  const data = fetch(source).then(response => response.json());

  if(method === "dom") {
    data.then((data) => Page.append(render_dom(data)));
  }

}

function openPage(page) {
  const tabs = document.querySelectorAll("#tabs > div");

  var found = null;
  tabs.forEach(tab => {
    if(page.name == tab.dataset.name) {
      found = tab;
    }
  });

  if(found) {
    renderPage(found);
  } else{
    const element = document.createElement("div");
    element.dataset.name = page.name;
    element.classList.add("tab");

    const label_container = document.createElement("div");
    label_container.classList.add("text_container");

    const label = document.createElement("span");
    label.innerText = page.name;
    label_container.append(label);

    const close_container = document.createElement("div");
    close_container.classList.add("text_container","close_tab")

    const close = document.createElement("span");
    close.classList.add("material-icons");
    close.innerText = "close";
    close.addEventListener("click",(_) => {
      element.classList.add("removing");
      if(element.classList.contains("selected")) {
        renderNothing();
      }
      element.remove();
    });
    close_container.append(close);

    element.dataset.source = page.contents;
    element.dataset.method = page.renderer;

    element.append(label_container,close_container);
    Tabs.append(element);

    element.addEventListener("click",(_) => {
      if(!element.classList.contains("removing")) {
        renderPage(element);
      }
    })
    renderPage(element);
  }
}


fetch("./resources/pages/index.json")
  .then((response) => response.json())
  .then((json) => {
    const explorer = document.querySelector("#drawer .explorer");

    // TODO - Use document queries instead of storing a selected element.

    let selected = null;


    function render_node(node, depth) {
      const element = document.createElement("div");
      element.classList.add("node");

      if (depth > 0) {
        element.style.paddingLeft = `${depth * 7}px`;
      }

      const entry = document.createElement("div");
      const icon = document.createElement("div");
      const name = document.createElement("div");
      name.innerText = node.name;
      entry.append(icon, name);
      element.append(entry);



      if (node.type == "folder") {

        element.classList.add("collapse");

        const icon_chevron = document.createElement("span");
        icon_chevron.classList.add("material-icons");
        icon_chevron.innerText = "chevron_right";
        icon.append(icon_chevron);

        element.append(...node.contents.map((content) => render_node(content, depth + 1)));

        entry.addEventListener("click",(_) => element.classList.toggle("collapse"));
      } else {
        entry.addEventListener("click",(_) => {
          setDrawer(false);
          openPage(node);
        });
      }

      entry.addEventListener("click",(e) => {



        if(selected != null) {
          selected.classList.remove("selected");
        }
        entry.classList.add("selected");
        selected = entry;
      });

      return element;
    }

    explorer.append(...json.map((node) => render_node(node, 0)));

  });
