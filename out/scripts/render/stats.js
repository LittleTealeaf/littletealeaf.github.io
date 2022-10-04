function render_stats(data) {
  const { references, stats } = data;

  const dom = render_dom({
    amp: "_stats",
    classList: ["&"],
    children: [
      {
        text: "My Programming Stats",
        tag: "h2",
      }
    ],
  });

  return dom;
}
