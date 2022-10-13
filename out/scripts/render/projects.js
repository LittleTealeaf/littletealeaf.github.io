function render_project_list(projects) {
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
        children: projects.map(({ src, thumbnail, description, tags }) => ({
          classList: "image",
          onclick: (_) => openFile(getFileBySource(src)),
          style: {
            backgroundImage: `url(${thumbnail})`,
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
                      text: description,
                    },
                    {
                      classList: "&_tags",
                      children: tags.map((tag) => ({
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
    children: project.content.map(render_dom),
  });
}
