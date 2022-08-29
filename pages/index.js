/// ABOUT ME

fetch('./resources/data/about.json').then(promiseJson).then((data) => {
  const element = document.getElementById("about");

  element.append(createElement({
    content: [
      createElement({
        classList: ["appbar"]
      })
    ]
  }))
})


//Stats
fetch('./resources/data/stats.json').then(promiseJson).then((data) => {
  const TIME_SPANS = [
    {
      name: "Past 7 Days",
      data: data.waka,week
    },
    {
      name: "Past 30 Days",
      data: data.waka.month
    },
    {
      name: "All Time",
      data: data.waka.all
    }
  ];
  
})