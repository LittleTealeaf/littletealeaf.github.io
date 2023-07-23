{
	const header_sections = [];

	document.querySelectorAll("header nav .item a").forEach((node) => {
		const id = node.href.split("#")[1];
		const element = document.getElementById(id);
		if (!element) {
			throw new Error(`Could not find section ${id}`);
		}

		header_sections.push(element);
	});

	function update_nav() {
		let selected = null;

		const window_height =
			window.innerHeight || document.documentElement.clientHeight;

		for (const section of header_sections) {
			const rect = section.getBoundingClientRect();

			if (rect.y < window_height / 4) {
				selected = section.id;
			} else {
				break;
			}
		}

		document.querySelectorAll('header nav  a').forEach((node) => {
			node.dataset.active = false;
		});

		if(selected) {
			let nav_item = document.querySelector(`header nav a[href="#${selected}"]`);
			if(!nav_item) {
				throw new Error("Header Nav Item not found");
			}
			nav_item.dataset.active = true;
		}

		

	}

	window.addEventListener("scroll", () => {
		const header = document.querySelector("header");

		if (!header) {
			throw new Error("Could not find header");
		}

		const rect = header.getBoundingClientRect();

		header.dataset.visible = rect.top == 0;
		update_nav();
	});
}
