function setTheme(theme) {
	const FLAVORS = ["latte", "frappe", "macchiato", "mocha"];
	if (!FLAVORS.includes(theme)) {
		console.error(
			"Invalid Theme, Expected one of [latte, frappe, macchiato, mocha]"
		);
		return;
	}

	document.body.dataset.theme = theme;
}

{
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: light)").matches
	) {
		setTheme("latte");
	}

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (event) => {
			setTheme(event.matches ? "macchiato" : "latte");
		});
}
