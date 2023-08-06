{
	const projects = document.querySelectorAll("#projects .project");

	function update_extended_height(project) {
				const content = project.querySelector(".content");
				content.style.setProperty(
					"--extended-height",
					`${content.scrollHeight}px`
				);
	}

	const github_promise = fetch("data/github.json")
		.then((res) => res.json())
		.then((data) => {
			projects.forEach((project) => {
				const github_data = data[project?.dataset?.github || ""];
				const icons = project.querySelector(".icons");

				github_data?.languages?.forEach((className) => {
					const icon = document.createElement("div");
					icon.classList.add("nf", className);
					icons?.append(icon);
				});
			});
		});

	const wakatime_promise = fetch("data/wakatime/projects.json")
		.then((res) => res.json())
		.then((data) => {
			projects.forEach((project) => {
				const wakatime_data = data[project?.dataset?.wakatime || ""];
				const wakatime = project.querySelector('.wakatime');

				// if(wakatime_data?.all_time != null) {
				// 	const all_time = document.createElement('div');
				// 	all_time.classList.add('chip');
				// 	all_time.textContent = `${wakatime_data.all_time.text} spent`;
				// 	wakatime?.append(all_time)
				// }

				if(wakatime_data?.last_7_days != null) {
					const last_7_days = document.createElement('div');
					last_7_days.classList.add('chip');
					last_7_days.textContent = `${wakatime_data.last_7_days.text} past week`;
					wakatime?.append(last_7_days)
				}
				if(wakatime_data?.last_30_days != null) {
					const element = document.createElement('div');
					element.classList.add('chip');
					element.textContent = `${wakatime_data.last_30_days.text} past month`;
					wakatime?.append(element)
				}
				if(wakatime_data?.last_year != null) {
					const element = document.createElement('div');
					element.classList.add('chip');
					element.textContent = `${wakatime_data.last_year.text} past year`;
					wakatime?.append(element)
				}
			});
		});

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
			update_extended_height(project);
			const is_hidden = project.dataset.hide == "true";
			projects.forEach((p) => (p.dataset.hide = true));
			project.dataset.hide = !is_hidden;
		});
		project.dataset.hide = true;
	});

	Promise.all([github_promise, wakatime_promise]).then(() => {
		addEventListener("resize", () => {
			update_extended_height(document.querySelector('#projects .project[data-hide="false"]'))
		});
	});
}
