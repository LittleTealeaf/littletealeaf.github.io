function render_project_list(projects) {

  // TODO add tags to the project?

  return render({
    classList: ["_projects"],
    children: [
      {
        classList: ["__title"],
        children: [
          {
            tag: "h1",
            text: "Projects",
          },
        ],
      },
      {
        classList: ["__list"],
        children: projects.map((project) => ({
          classList: ["image"],
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
                      classList: ["__caption"],
                      text: project.description
                    },{
                      classList: ["__tags"],
                      children: project.tags.map((tag) => ({
                        text: tag
                      }))
                    }
                  ]
                },
              ],
            },
          ],
        })),
      },
    ],
  });
}
