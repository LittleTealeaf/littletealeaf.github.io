{
	document.addEventListener("scroll", () => {
		document.querySelectorAll("#about .entry").forEach((entry) => {
			const rect = entry.getBoundingClientRect();

			entry.dataset.show =
				rect.y <
				(window.innerHeight || document.documentElement.clientHeight) * 3 / 4;
		});
	});
}
