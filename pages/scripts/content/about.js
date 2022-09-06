fetch("./resources/data/about.json")
  .then(promiseJson)
  .then((data) => {
    const content = document.getElementById("about_content");

    if(!content) {
      return console.error("about_content element not found");
    }

    content.append(
      createElement({
        classList: "prompt",
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
      })
    );

    content.append(
      createElement({
        classList: "response",
        content: [
          createElement({
            node: "img",
            src: "./resources/images/avatar.webp",
          }),
          createElement({
            content: [
              createElement({
                classList: "user_title",
                content: "Thomas Kwashnak",
              }),
              createElement({ node: "hr" }),
              createElement({
                node: "table",
                content: Object.entries(data).map(([key, value]) =>
                  createElement({
                    node: "tr",
                    content: [
                      createElement({
                        node: "td",
                        content: key,
                      }),
                      createElement({
                        node: "td",
                        content: value.constructor == Array ? value.join(", ") : value,
                      }),
                    ],
                  })
                ),
              }),
            ],
          }),
        ],
      })
    );

    content.append(
      createElement({
        classList: "prompt",
        content: [
          createElement({
            node: "span",
            content: "littletealeaf@github.io",
          }),
          createElement({
            node: "span",
            classList: "cursor",
            content: " █",
          }),
        ],
      })
    );
  });
