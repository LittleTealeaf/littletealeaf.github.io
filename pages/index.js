const Body = document.querySelector("body");
const Header = document.querySelector("header");
const Drawer = document.querySelector("#drawer");
const Page = document.querySelector("#page");

function setDrawer(open) {
  Body.dataset.drawer = open;
}

document.querySelector("#drawer_toggle").addEventListener("click", (_) => setDrawer(true));

document.querySelectorAll("#drawer .action_close_drawer").forEach((element) => element.addEventListener("click", (_) => setDrawer(false)));

fetch('./resources/pages/index.json').then(response => response.json()).then(json => {
  const element = document.querySelector("#drawer .explorer");

  function build_node(node) {
    const element = document.createElement("div");
    if(node.type == "page") {

      element.classList.add("page");

      element.innerText = node.name;


    } else if(node.type == "folder") {

      element.classList.add("folder");
      element.dataset.expand = false;

      const header = document.createElement("div");

      const icon = document.createElement("span");
      icon.classList.add("material-icons");
      icon.innerText = "chevron_right";
      const title = document.createElement("span");
      title.innerText = node.name;

      header.append(icon,title);


      header.addEventListener('click',(_) => {
        element.classList.toggle("collapse")
      })

      const children = document.createElement("div");
      children.append(...node.contents.map(build_node));

      element.append(header,children);





    }
    return element;
  }

  json.forEach(node => {
    element.appendChild(build_node(node));
  })

})
