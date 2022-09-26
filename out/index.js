BODY = document.querySelector("body");

function setDrawer(value) {
  BODY.dataset.drawer = value;
}

document.querySelector("#drawer-toggle").addEventListener("click", () => setDrawer(true));
document.querySelector("#drawer .closer").addEventListener("click", () => setDrawer(false));

function renderFile(file) {}

function openFile(file) {
  console.log(file);
}

function renderFile(file, depth = 0) {
  const _file = document.createElement("div");
  _file.classList.add("file");

  _file.dataset.src = file.src;
  // _file.dataset.src = data.src;
  // _file.dataset.render = data.render;

  if (depth > 0) {
    _file.style.paddingLeft = `${depth * 5}px`;
  }

  const _label = document.createElement("div");
  _label.classList.add("label");

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
    openFile(file);
  });

  return _file;
}

// Fetch the index.json as a json object
fetch("./resources/index.json")
  .then((response) => response.json())
  .then((data) => {
    const panel = document.querySelector("#drawer .panel");

    panel.append(...data.map((data) => renderFile(data, 0)));
  });
