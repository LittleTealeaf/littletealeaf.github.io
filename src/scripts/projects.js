{

	function update_header_height() {

		const header = document.querySelector("header");
		if(header == null) {
			console.error("Header not found");
			return;
		}

		const project_header = document.querySelector("#projects .header");

		if(project_header == null) {
			console.error("Project Header not found");
			return;
		}

		const rect = header.getBoundingClientRect();
		console.log(rect.height);

		project_header.style.top = `${rect.height}px`;
	}
	addEventListener('resize', update_header_height);

	update_header_height();
}
