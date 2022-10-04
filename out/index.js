
const BODY = document.querySelector("body");
const TABS = document.querySelector("#tabs");
const CONTENT = document.querySelector("#content");

const files = [];

var current_rendering = (async () => {})();

const cleanup_scripts = [];

function setDrawer(value) {
  BODY.dataset.drawer = value;
}

document.querySelector("#drawer-toggle").addEventListener("click", () => setDrawer(true));
document.querySelector("#drawer .closer").addEventListener("click", () => setDrawer(false));

// async function renderAndAppend(renderer) {
//   return (file) => CONTENT.append(renderer(file));
// }

function expandFileParents(id) {
  const _file = document.querySelector(`#drawer .file[data-id="${id}"]`);
  if (!_file) return;

  var parent_element = _file.parentElement.parentElement;
  while (parent_element.classList.contains("file")) {
    parent_element.classList.add("--expanded");
    parent_element = parent_element.parentElement.parentElement;
  }
}

function findFile(name) {
  return files.findIndex((file) => file.name == name);
}

function getFileBySource(source) {
  return files.findIndex((file) => file.src == source);
}

function getFileById(id) {
  return files.findIndex((file) => file.id == id);
}

function registerCleanupScript(script) {
  cleanup_scripts.push(script);
}

async function openFile(id) {
  setDrawer(false);

  expandFileParents(id);

  if (TABS.querySelector(`.tab.--selected[data-id="${id}"]`)) return;

  const previous = TABS.querySelector(".tab.--selected");
  if (previous) {
    previous.classList.remove("--selected");
  }

  const file =
    id >= 0
      ? files[id]
      : (() => {
          const open_tabs = TABS.querySelectorAll(".tab");
          if (open_tabs.length > 0) {
            id = open_tabs[open_tabs.length - 1].dataset.id;
            return files[id];
          }
          return null;
        })();

  while(cleanup_scripts.length > 0) {
    cleanup_scripts.pop()()
  }
  CONTENT.innerHTML = "";

  const _file_previous = document.querySelector("#drawer .file.--selected");
  if (_file_previous) {
    _file_previous.classList.remove("--selected");
  }

  if (!file) return;

  let tab = TABS.querySelector(`.tab[data-id="${id}"]`);

  if (!tab) {
    tab = document.createElement("div");
    tab.classList.add("tab");
    tab.dataset.id = id;

    const _label = document.createElement("div");
    _label.classList.add("label");

    const _label_content = document.createElement("span");
    _label_content.innerText = file.name;
    _label.append(_label_content);

    const _close = document.createElement("div");
    _close.classList.add("close");
    const _close_content = document.createElement("span");
    _close_content.classList.add("material-icons");
    _close_content.innerText = "close";
    _close.append(_close_content);

    _close.addEventListener("click", (e) => {
      e.stopPropagation();
      tab.remove();
      if (tab.classList.contains("--selected")) {
        openFile(-1);
      }
    });

    tab.append(_label, _close);

    tab.addEventListener("auxclick", (e) => {
      if (e.button == 1) {
        _close.click();
      }
    });

    tab.addEventListener("click", (e) => {
      if (e.which == 1) {
        openFile(id);
      } else if (e.which == 2) {
        _close.click();
        e.stopPropagation();
      }
    });

    TABS.append(tab);
  }

  tab.classList.add("--selected");

  // Set file selection

  const _file = document.querySelector(`#drawer .file[data-id="${id}"]`);
  if (_file) {
    _file.classList.add("--selected");
  }

  // RENDER FILE
  current_rendering = current_rendering.then(
    fetch(file.src)
      .then((res) => res.json())
      .then((json) => {
        CONTENT.innerHTML = "";
        CONTENT.append(({
          dom: render_dom,
          project_list: render_project_list,
          resume: render_resume,
          project: render_dom
        })[file.render](json))
        if(file.id) {
          window.location.hash = file.id;
        } else {
          window.location.hash = "";
        }
      })
  );
}

function renderFile(file, depth = 0) {
  const _file = document.createElement("div");
  _file.classList.add("file");

  _file.dataset.id = files.length;
  files.push({
    src: file.src,
    render: file.render,
    name: file.name,
    id: file.id,
  });

  const _label = document.createElement("div");
  _label.classList.add("label");
  if (depth > 0) {
    _label.style.paddingLeft = `${depth * 5}px`;
  }

  const _icon = document.createElement("div");
  _icon.classList.add("icon");

  const _name = document.createElement("div");
  _name.classList.add("name");

  const _name_span = document.createElement("span");
  _name_span.innerText = file.name;

  _name.append(_name_span);
  _label.append(_icon, _name);
  _file.append(_label);

  if (file.children) {
    const _icon_span = document.createElement("span");
    _icon_span.classList.add("material-icons");
    _icon_span.innerText = "chevron_right";
    _icon.appendChild(_icon_span);

    _icon.addEventListener("click", (e) => {
      e.stopPropagation();
      _file.classList.toggle("--expanded");
    });

    const _children = document.createElement("div");
    _children.classList.add("children");
    _children.append(...file.children.map((data) => renderFile(data, depth + 1)));
    _file.append(_children);
  }

  _label.addEventListener("click", (_) => {
    openFile(_file.dataset.id);
  });

  return _file;
}

// Fetch the index.json as a json object
fetch("./resources/index.json")
  .then((response) => response.json())
  .then((data) => {
    const panel = document.querySelector("#drawer .panel");

    panel.append(...data.map((data) => renderFile(data, 0)));

    // Open the first one

    // openFile(getFileById("resume"));

    // DEVELOPER
    // openFile(5);

    return openFile(getFileById("resume"));


    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      openFile(getFileById(id));
    } else {
      openFile(0);
    }


  });