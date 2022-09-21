const BODY = document.querySelector("body");

document.getElementById("drawer_button").addEventListener("click",(_) => {
  BODY.dataset.drawer = "visible";
});

document.getElementById("drawer_close").addEventListener("click",(_) => {
  BODY.dataset.drawer = "hidden";
});
