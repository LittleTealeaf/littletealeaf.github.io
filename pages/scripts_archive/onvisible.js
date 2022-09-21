const onVisibleObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
});


document.querySelectorAll(".onvisible").forEach(onVisibleObserver.observe);
