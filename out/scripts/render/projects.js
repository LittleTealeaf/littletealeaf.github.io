function render_project_list(projects) {
  return render_dom({
    classList: ["_project_list"],
    children: [
      {
        classList: ["__title"],
        children: [
          {
            tag: "h1",
            text: "My Projects",
          },
        ],
      },
      {
        classList: ["__list"],
        children: projects.map((project) => ({
          classList: ["image"],
          onclick: () => {
            openFile(findFile(project.src));
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
