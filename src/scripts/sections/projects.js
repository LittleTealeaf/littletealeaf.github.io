{
	const projects = document.querySelectorAll("#projects .project");

	const github_promise = fetch("data/github.json")
		.then((res) => res.json())
		.then((data) => {
			projects.forEach((project) => {
				const github_data = data[project.dataset.github];
				const icons = project.querySelector(".icons");

				github_data?.languages?.forEach((className) => {
					const icon = document.createElement("div");
					icon.classList.add("nf", className);
					icons.append(icon);
				});
			});
		});

	console.log(`Loaded ${sessionStorage.getItem("click")} times`)

	document.querySelectorAll("#projects .project .link").forEach((link) => {
		link.addEventListener("click", () =>
			sessionStorage.setItem(
				"click",
				1 + (Number(sessionStorage.getItem("click")) || 0)
			)
		);
	});

	projects.forEach((project) => {
		project.querySelector(".summary")?.addEventListener("click", () => {
			const is_hidden = project.dataset.hide == "true";
			projects.forEach((p) => (p.dataset.hide = true));
			project.dataset.hide = !is_hidden;
		});
	});

	Promise.all([github_promise]).then(() => {
		addEventListener("resize", () => {
			projects.forEach((project) => {
				const content = project.querySelector(".content");
				content.style.setProperty(
					"--extended-height",
					`${content.scrollHeight}px`
				);
			});
		});
		projects.forEach((project) => {
			const content = project.querySelector(".content");

			content.style.setProperty(
				"--extended-height",
				`${content.scrollHeight}px`
			);

			project.dataset.hide = "true";
		});
	});
}
