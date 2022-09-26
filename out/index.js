BODY = document.querySelector("body");

function setDrawer(value) {
  BODY.dataset.drawer = value;
}

document.querySelector("#drawer-toggle").addEventListener("click", () => setDrawer(true));
document.querySelector("#drawer .closer").addEventListener("click", () => setDrawer(false));





// Fetch the index.json as a json object
fetch('./resources/index.json').then(response => response.json()).then(data => {
  const panel = document.querySelector("#drawer .panel");
});
