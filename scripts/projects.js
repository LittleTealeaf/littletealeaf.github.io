const project_node = document.getElementById("projects");
const list_node = document.getElementById("project_list");
const preview_node = document.getElementById("project_preview");

var selection_current;

async function fetchJson() {
  const response = await fetch("generated/projects.json");
  const data = await response.json();
  return data;
}

/*
<div id="project_preview_close" class="material-icons">close</div>
            <div class="text">
              <h1>Wordle Clone</h1>
              <p>A simple clone from the popular game \"Wordle\" that I wanted to try recreating.</p>
              <div class="links">
                <a class="material-icons" href="https://github.com/LittleTealeaf">code</a>
              </div>
            </div>
            <img src="generated/images/Wordle_Clone.png">
*/

function preview(div,project) {
    if(selection_current != null) {
        delete selection_current.dataset.selected;
    }
    selection_current = div;

    preview_node.innerHTML = "";

    const close_node = document.createElement("div");
    close_node.id = "project_preview_close";
    close_node.classList.add("material-icons");
    close_node.innerText = "close";
    close_node.onclick = closePreview;
    preview_node.append(close_node);

    const node_text = document.createElement("div");
    node_text.classList.add("text");

    const h1 = document.createElement("h1");
    h1.innerText = project.name;
    node_text.append(h1);

    project.description.forEach(paragraph => {
        const node = document.createElement("p");
        node.innerText = paragraph;
        node_text.append(node);
        if(project_node.dataset.preview == "false") {
          node.style.whiteSpace = "nowrap";
          setTimeout(() => node.style.whiteSpace = "unset",150);
        }
    });

    const node_links = document.createElement("div");
    node_links.classList.add("links");
    project.links.forEach((link) => {
        const node = document.createElement("a");
        node.classList.add("material-icons");
        node.target = "_blank";
        node.href = link.link;
        node.innerText = link.icon;
        node_links.append(node);
    });
    node_text.append(node_links);

    preview_node.append(node_text);


    if(project.image != null) {
        const img = document.createElement("img");
        img.src = project.image;
        img.alt = `Preview Image of ${project.name}`;
        preview_node.append(img);
    }


    project_node.dataset.preview = "true";

}

function closePreview() {
    if(selection_current != null) {
        delete selection_current.dataset.selected;
        selection_current = null;
    }

    project_node.dataset.preview = 'false';
}

function renderProjects(projects) {
  projects.forEach((project) => {
    const div = document.createElement("div");

    div.onclick = () => {
      if (div.dataset.selected != null) {
        closePreview();
      } else {
        div.dataset.selected = "";
        preview(div,project);
      }
    };

    const folder = document.createElement("div");
    folder.classList.add("folder", "material-icons");
    folder.innerText = project.material_icon;

    const name = document.createElement("div");
    name.classList.add("name");
    name.innerText = project.name;

    div.append(folder, name);

    list_node.append(div);
  });
}

fetchJson().then(renderProjects);
