{
	const entries = document.querySelectorAll("#about .entry");

	window.addEventListener("scroll", () => {
		const window_height =
			window.innerHeight || document.documentElement.clientHeight;

		for (const entry of entries) {
			const rect = entry.getBoundingClientRect();

			const is_visible =
				rect.top < window_height * (entry.dataset.height || 0.55);

			entry.dataset.display = is_visible;
		}
	});

	const title = document.querySelector("#about .title");

	if (!title) {
		throw new Error("Could not find title");
	}

	const text = title.textContent || "About Me";

	window.addEventListener("scroll", () => {
		const window_height =
			window.innerHeight || document.documentElement.clientHeight;

		const offset = window_height * 0.25;
		const anim_space = window_height * 0.75;
		const intervals = anim_space / text.length;

		const rect = title.getBoundingClientRect();

		// const progression = rect.top - offset;
		const progression = Math.max(
			0,
			Math.min(
				Math.floor((anim_space + offset - rect.top) / intervals),
				text.length
			)
		);

		title.textContent = "⁤" + text.substring(0, progression);
	});

	const dotfiles_time = document.getElementById("dotfiles-time");

	if (dotfiles_time) {
		fetch('data/wakatime/projects.json').then((res) => res.json()).then((data) => {
			dotfiles_time.innerText = `${data?.dotfiles?.all_time?.hours} hours`
		})
	}
}
