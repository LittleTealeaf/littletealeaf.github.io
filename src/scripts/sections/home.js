{
	let content = document.querySelector(
		"#home .theme-dropdown .dropdown-content"
	);

	if (!content) {
		throw new Error("Could not find Theme Content");
	}

	window.addEventListener("load", () => {
		for (const theme of THEMES) {
			const entry = document.createElement("a");
			entry.addEventListener("click", () => {
				setTheme(theme);
			});
			entry.dataset.themeOption = theme;
			entry.dataset.selected = "false";
			entry.innerText = theme;
			content.append(entry);
		}
	});

	window.addEventListener("scroll", () => {
		const header = document.querySelector("header");

		if (!header) {
			throw new Error("Could not find Header");
		}

		const rect = header.getBoundingClientRect();

		const dock_container = document.querySelector("#home .dock-container");

		if (!dock_container) {
			throw new Error("Could not find Dock");
		}

		const window_height =
			window.innerHeight || document.documentElement.clientHeight;

		dock_container.dataset.hide = rect.top < window_height;
	});

	const clock = document.querySelector("#home .clock");

	if (!clock) {
		throw new Error("Could not find Clock");
	}

	function update_clock() {
		const date = new Date();

		clock.innerText = date.toLocaleString("en-us", {
			month: "short",
			day: "2-digit",
			hour: "numeric",
			minute: "numeric",
		});

		const interval = (60 - date.getSeconds()) * 1000 + 5;

		setTimeout(update_clock, interval);
	}

	update_clock();
}
