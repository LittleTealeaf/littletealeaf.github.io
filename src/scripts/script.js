const THEMES = ["latte", "frappe", "macchiato", "mocha"];

function setTheme(theme) {

  if (!THEMES.includes(theme)) {
    console.error("Invalid Theme, Expected one of [latte, frappe, macchiato, mocha]");
    return;
  }
  document.body.dataset.theme = theme;

  document.querySelectorAll(`[data-theme-option]`).forEach((element) => {
    element.dataset.selected = element.dataset.themeOption == theme;
  });

  document.cookie = `theme=${theme}`;
}

/**
 * https://www.w3schools.com/js/js_cookies.asp
 */
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

// Initial Load of Theme
{
  function prefersLightTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  }

  window.addEventListener("load", () => {
    const cookie = getCookie("theme");
    setTheme(cookie || (prefersLightTheme() && "latte") || "macchiato");
  });
}
