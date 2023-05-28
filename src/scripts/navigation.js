{
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.parentElement.addEventListener("click", function(e) {
			e.preventDefault();

			document.querySelector(anchor.getAttribute("href"))?.scrollIntoView({
				behavior: "smooth",
			});
		});
	});

	function update_nav_selection() {

		const sections = ["about", "projects", "resume", "contact"];

		let selected = null;


		for(const section of sections) {
			const top_element = document.getElementById(section);
			if(top_element == null) {
				return;
			}

			const rect = top_element.getBoundingClientRect();

			if (rect.y < (window.innerHeight || document.documentElement.clientHeight) / 2) {
				selected = section;
			}
		}

		sections.forEach((section) => {
			let node = document.querySelector(`header a[href="#${section}"]`)?.parentNode;
			

			if(node == null) {
				return;
			}

			node.dataset.selected = section == selected;
		});
	}


	document.addEventListener("scroll", () => {
		const landing_end = document.getElementById("landing-bottom");

		const header = document.querySelector("header");

		if(landing_end == null) {
			console.log("Could not find landing");
			return;
		}

		if(header == null) {
			console.log("Could not find header");
			return;
		}

		header.dataset.show = isInViewport(header) && !isInViewport(landing_end);

		update_nav_selection();



	})

	document.querySelector("header .title")?.addEventListener("click", (e) => {
		e.preventDefault();

		document.getElementById("landing")?.scrollIntoView({
			behavior: "smooth"
		})
	});
}
