(() => {

  const nav = document.querySelector("nav");



  const endpoints = [
    {
      name: "Projects",
      id: "projects",
    },{
      name: "Testing",
      id: "testing"
    },{
      name: "Stats",
      id: "stats"
    },{
      name: "Contact",
      id: "contact"
    }
  ].map((endpoint) => {
    const element = document.createElement("a");
    element.innerText = endpoint.name;
    element.href = `#${endpoint.id}`
    nav.append(element);
    return {...endpoint, element};
  });


  const onSectionVisibleObserver = new IntersectionObserver((entries) => {
    var selected = false;
    entries.forEach(entry => {
      if(!selected && entry.isIntersecting) {
        endpoints.forEach(endpoint => {
          if(endpoint.id === entry.target.id) {
            endpoint.element.classList.add("current");
          } else {
            endpoint.element.classList.remove("current");
          }
        })
        selected = true;
      }
    })
  });

  endpoints.forEach(endpoint => {
    const element = document.getElementById(endpoint.id);
    if(element) {
      onSectionVisibleObserver.observe(element);
    }
  })


})();
