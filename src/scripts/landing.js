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

}
