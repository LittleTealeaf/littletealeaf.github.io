{
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function(e) {
			e.preventDefault();

			document.querySelector(this.getAttribute("href")).scrollIntoView({
				behavior: "smooth",
			});
		});
	});


	document.addEventListener("scroll", () => {
		const landing_end = document.getElementById("landing-bottom");
		const landing = document.getElementById("landing");

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


	})
}
