const BODY = document.querySelector("body");
const TABS = document.querySelector("#tabs");
const CONTENT = document.querySelector("#content");

const files = [];

function setDrawer(value) {
  BODY.dataset.drawer = value;
}

document.querySelector("#drawer-toggle").addEventListener("click", () => setDrawer(true));
document.querySelector("#drawer .closer").addEventListener("click", () => setDrawer(false));

function renderAndAppend(renderer) {
  return (file) => CONTENT.append(renderer(file));
}

function openFile(id) {

  setDrawer(false);

  if(TABS.querySelector(`.tab.--selected[data-id="${id}"]`)) return;


  const previous = TABS.querySelector(".tab.--selected");
  if(previous) {
    previous.classList.remove("--selected");
  }

  const file = id >= 0 ? files[id] : (() => {
    const open_tabs = TABS.querySelectorAll(".tab");
    if(open_tabs.length > 0) {
      id = open_tabs[open_tabs.length - 1].dataset.id;
      return files[id];
    }
    return null;
  })();

  CONTENT.innerHTML = "";

  if(!file) return;

  let tab = TABS.querySelector(`.tab[data-id="${id}"]`);

  if(!tab) {
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

    _close.addEventListener("click",(e) => {
      e.stopPropagation();
      tab.remove();
      if(tab.classList.contains("--selected")) {
        openFile(-1);
      }
    })

    tab.append(_label, _close);

    tab.addEventListener("auxclick",(e) => {
      if(e.button === 1) {
        _close.click();
        e.stopPropagation();
      }
    })

    tab.addEventListener("click", () => {
      openFile(id);
    });


    TABS.append(tab);
  }

  tab.classList.add("--selected");

  // RENDER FILE

  const data = fetch(file.src).then(res => res.json());

  if(file.render == 'dom') {
    data.then(renderAndAppend(render_dom));
  }

  /*
  // select and remove the --selected class from tabs
  const previous = TABS.querySelector(".tab.--selected");
  if (previous) {
    previous.classList.remove("--selected");
  }

  const { src, render, name } = file.dataset;

  // // Check if there is a tab currently open
  // const previous_tab = document.querySelector("#tabs .--selected");
  // if(previous_tab) {
  //   previous_tab.classList.remove("--selected");
  // }

  // var tab = document.querySelector(`#tabs [data-src="${file.src}"]`);

  // if(!file) {
  //   const list = document.querySelectorAll("#tabs .tab");
  //   tab = list[list.length - 1];
  // }

  // if(!tab) {
  //   tab = document.createElement("div");
  //   tab.classList.add("tab");
  //   tab.dataset.src = file.src;
  //   tab.dataset.name = file.name;
  //   tab.dataset.render = file.render;

  //   const _label = document.createElement("div");
  //   _label.classList.add("label");
  //   const _label_span = document.createElement("span");
  //   _label_span.innerText = file.name;
  //   _label.append(_label_span);

  //   const _close = document.createElement("div");
  //   _close.classList.add("close");
  //   const _close_span = document.createElement("span");
  //   _close_span.classList.add("material-icons");
  //   _close_span.innerText = "close";
  //   _close.append(_close_span);

  //   _close.addEventListener("click",(e) => {
  //     e.stopPropagation();
  //     if(tab.classList.contains("--selected")) {
  //       openFile(null);
  //     }
  //     tab.remove();
  //   })

  //   tab.append(_label, _close);

  //   tab.addEventListener("click",(_) => {
  //     tab.classList.contains("--selected");
  //   })

  //   TABS.append(tab);
  // }

  // tab.classList.add("--selected");
  */
}

function renderFile(file, depth = 0) {
  const _file = document.createElement("div");
  _file.classList.add("file");

  _file.dataset.id = files.length;
  files.push({
    src: file.src,
    render: file.render,
    name: file.name,
  });

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
  });
