fetch("./resources/data/stats.json")
  .then(promiseJson)
  .then((data) => {
    const element = document.getElementById("stats");

    const categories = Object.entries(data.waka).map(([key,value]) => ({
      "element": createElement({
        content: key,
        classList: "tab"
      }),
      "data": value
    }));

    element.append(createElement({
      classList: "header",
      content: categories.map(category => category.element)
    }))
  });
