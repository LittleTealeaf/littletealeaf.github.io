{
	function update_clock() {
		const date = new Date();

		const element = document.getElementById("landing-date");

		if (element != null) {
			element.innerText = date.toLocaleString("en-us", {
				month: "short",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric",
			});
		}

		var interval = (60 - date.getSeconds()) * 1000 + 5;
		setTimeout(update_clock, interval);
	}

	update_clock();


	const element = document.querySelector("#theme-dropdown .dropdown-content .panel");

	if(element != null) {
		for(const theme of ["latte", "frappe", "macchiato", "mocha"]) {
			const div = document.createElement("div");
			div.innerText = theme;
			div.dataset.themeOption = theme;

			div.addEventListener("click", () => setTheme(theme));


			element.append(div);
		}
	}


	document.addEventListener("scroll", () => {

		const taskbar = document.querySelector("#landing .taskbar");

		if(taskbar == null) {
			console.error("Could not find taskbar");
			return;
		}

		const dock = document.querySelector("#landing .dock");

		if (dock == null) {
			console.error("Could not find dock");
			return;
		}

		dock.dataset.hide = !isInViewport(taskbar);
	})


	document.querySelectorAll("#landing .cursor").forEach((cursor) => {
		setInterval(() => {
			let display = cursor.style.display;
			if (display == 'none') {
				cursor.style.display = '';
			} else {
				cursor.style.display = 'none';
			}
		}, 1000)
	})

}
