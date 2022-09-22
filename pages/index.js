const Body = document.querySelector("body");
const Header = document.querySelector("header");
const Drawer = document.querySelector("#drawer");
const Page = document.querySelector("#page");

function setDrawer(open) {
  Body.dataset.drawer = open;
}

document.querySelector("#drawer_toggle").addEventListener("click", (_) => setDrawer(true));

document.querySelectorAll("#drawer .action_close_drawer").forEach((element) => element.addEventListener("click", (_) => setDrawer(false)));

fetch("./resources/pages/index.json")
  .then((response) => response.json())
  .then((json) => {
    const explorer = document.querySelector("#drawer .explorer");

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
      }

      entry.addEventListener("click",(_) => {
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
