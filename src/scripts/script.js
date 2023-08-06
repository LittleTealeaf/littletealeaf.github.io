const THEMES = ["latte", "frappe", "macchiato", "mocha"];

function setTheme(theme) {
	if (!THEMES.includes(theme)) {
		console.error(
			"Invalid Theme, Expected one of [latte, frappe, macchiato, mocha]"
		);
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
		return (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: light)").matches
		);
	}

	window.addEventListener("load", () => {
		const key = ["k", "c", "i", "l", "c"].reverse().join("");
		if (Number(sessionStorage.getItem(key)) >= 5) {
			sessionStorage.setItem(key, 0);
			document.body.dataset.theme = "loading";
		} else {
			const cookie = getCookie("theme");
			setTheme(cookie || (prefersLightTheme() && "latte") || "macchiato");
		}
	});
}

window.addEventListener("load", () => {
	document.querySelectorAll('[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", (e) => {
			e.preventDefault();

			const header = document.querySelector("header");
			const header_rect = header?.getBoundingClientRect();
			const header_height = header_rect?.height;

			const section = document.querySelector(anchor.getAttribute("href"));
			const section_rect = section?.getBoundingClientRect();

			window.scrollTo({
				top: window?.scrollY + (section_rect?.y || 0) - (header_height || 0),
				behavior: "smooth",
			});
		});
	});
});
