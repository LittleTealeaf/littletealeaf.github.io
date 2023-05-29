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

  document.cookie = `theme=${theme}`;
}

{
  function prefersLightTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  }



  window.addEventListener("load", () => {
    const cookie = getCookie("theme");
    setTheme(cookie || prefersLightTheme() && "latte" || "macchiato");
  });
}
