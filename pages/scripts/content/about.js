fetch("./resources/data/about.json")
  .then(promiseJson)
  .then((data) => {
    const content = document.getElementById("about_content");

    content.append(createElement({
      classList: "prompt",
      content: [
        createElement({
          node: "span",
          content: "littletealeaf@github.io"
        }),
        createElement({
          node: "span",
          content: " neofetch"
        })
      ]
    }));

    content.append(createElement({
      classList: "response",
      content: [
        createElement({
          node: "img",
          src: "./resources/images/avatar.webp"
        })
      ]
    }))

    content.append(createElement({
      classList: "prompt",
      content: [
        createElement({
          node: "span",
          content: "littletealeaf@github.io"
        }),
        createElement({
          node: "span",
          classList: "cursor",
          content: " █"
        })
      ]
    }))

  });
