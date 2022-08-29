/// ABOUT ME

fetch("./resources/data/about.json")
  .then(promiseJson)
  .then((data) => {
    const element = document.getElementById("about");

    /*
    TODO: hard bake the window into the screen, and then act as if it runs the command when it loads (maybe delay loading until it is scrolled into view)
    */

    element.append(
      createElement({
        content: [
          createElement({
            classList: ["appbar"],
            content: createElement({
              content: "littletealeaf@github.io",
            }),
          }),
          createElement({
            classList: ["content"],
            content: [
              createElement({
                classList: ["prompt"],
                content: [
                  createElement({
                    node: "span",
                    content: "littletealeaf@github.io",
                  }),
                  createElement({
                    node: "span",
                    content: " neofetch",
                  }),
                ],
              }),
              createElement({
                classList: ["neofetch"],
                content: [
                  createElement({
                    node: "img",
                    src: "./resources/images/avatar.webp",
                  }),
                  createElement({
                    classList: ["data"],
                    content: [],
                  }),
                ],
              }),

              createElement({
                classList: ["prompt"],
                content: [
                  createElement({
                    node: "span",
                    content: "littletealeaf@github.io",
                  }),
                  createElement({
                    node: "span",
                    classList: ["cursor"],
                    content: " █",
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  });

//Stats
fetch("./resources/data/stats.json")
  .then(promiseJson)
  .then((data) => {
    const TIME_SPANS = [
      {
        name: "Past 7 Days",
        data: data.waka,
        week,
      },
      {
        name: "Past 30 Days",
        data: data.waka.month,
      },
      {
        name: "All Time",
        data: data.waka.all,
      },
    ];
  });
