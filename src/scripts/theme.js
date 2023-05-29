function setTheme(theme) {
  const FLAVORS = ["latte", "frappe", "macchiato", "mocha"];
  if (!FLAVORS.includes(theme)) {
    console.error("Invalid Theme, Expected one of [latte, frappe, macchiato, mocha]");
    return;
  }

  document.body.dataset.theme = theme;

  document.querySelectorAll(`[data-theme-option]`).forEach((element) => {
    element.dataset.selected = element.dataset.themeOption == theme;
  });
}

{
  const load_function = window.onload || function () {};

  window.onload = function () {
    load_function();

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("latte");
    } else {
      setTheme("macchiato");
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      setTheme(event.matches ? "macchiato" : "latte");
    });
  };
}
