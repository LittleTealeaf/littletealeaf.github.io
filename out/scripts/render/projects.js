function render_project_list(projects) {

  // TODO add tags to the project?

  return render_dom({
    classList: ["_projects"],
    children: [
      {
        classList: ["_projects_title"],
        children: [
          {
            tag: "h1",
            text: "Projects",
          },
        ],
      },
      {
        classList: ["_projects_list"],
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
                      classList: ["_projects_caption"],
                      text: project.description
                    },{
                      classList: ["_projects_tags"],
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
