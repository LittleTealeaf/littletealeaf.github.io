function render_project_list(projects) {
  // TODO add tags to the project?

  return render_dom({
    classList: "&",
    amp: "_projects",
    children: [
      {
        classList: "&_title",
        children: [
          {
            tag: "h1",
            text: "Projects",
          },
        ],
      },
      {
        classList: "&_list",
        children: projects.map((project) => ({
          classList: "image",
          onclick: (_) => {
            openFile(getFileBySource(project.src));
          },
          style: {
            backgroundImage: `url(${project.thumbnail})`,
          },
          children: [
            {
              classList: ["image_overlay"],
              children: [
                {
                  classList: ["image_content"],
                  children: [
                    {
                      classList: "&_caption",
                      text: project.description,
                    },
                    {
                      classList: "&_tags",
                      children: project.tags.map((tag) => ({
                        text: tag,
                      })),
                    },
                  ],
                },
              ],
            },
          ],
        })),
      },
    ],
  });
}

function render_project(project) {

  return render_dom({
    classList: "&",
    amp: "_project",
    children: project.content.map(render_dom)
  })
}
