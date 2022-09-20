const elements = document.querySelectorAll(".onvisible");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.classList.add("rendered");
    } else {
      entry.target.classList.remove("visible");
    }
  });
});

elements.forEach((element) => observer.observe(element));
