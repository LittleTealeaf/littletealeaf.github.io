{
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.parentElement.addEventListener("click", function(e) {
			e.preventDefault();

			const header = document.querySelector("header");
			const header_rect = header?.getBoundingClientRect();
			const header_height = header_rect?.height;


			let section = document.querySelector(anchor.getAttribute("href"));
			let section_rect = section?.getBoundingClientRect();

			window.scrollTo({
				top: (window?.scrollY) + (section_rect?.y || 0) - (header_height || 0),
				behavior: 'smooth'
			})
		});
	});

	document.querySelector("header .title")?.addEventListener("click", (e) => {
		e.preventDefault();

		document.getElementById("landing")?.scrollIntoView({
			behavior: "smooth",
		});
	});

	function update_nav_selection() {

		const sections = ["about", "projects", "stats", "resume", "contact"];

		let selected = null;

		for (const section of sections) {
			const top_element = document.getElementById(section);
			if (top_element == null) {
				return;
			}

			const rect = top_element.getBoundingClientRect();

			if (
				rect.y <
				(window.innerHeight || document.documentElement.clientHeight) / 2
			) {
				selected = section;
			}
		}

		sections.forEach((section) => {
			let node = document.querySelector(
				`header a[href="#${section}"]`
			)?.parentNode;

			if (node == null) {
				return;
			}

			node.dataset.selected = section == selected;
		});
	}

	document.addEventListener("scroll", () => {
		const landing_end = document.getElementById("landing-bottom");

		const header = document.querySelector("header");

		if (landing_end == null) {
			console.log("Could not find landing");
			return;
		}

		if (header == null) {
			console.log("Could not find header");
			return;
		}

		header.dataset.show = isInViewport(header) && !isInViewport(landing_end);

		update_nav_selection();
	});
}
