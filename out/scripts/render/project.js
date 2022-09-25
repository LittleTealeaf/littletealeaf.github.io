function render_project(project) {
  return render_dom({
    classList: ["__project"],
  });
}

function render_project_list(projects) {
  return render_dom({
    classList: ["__all_projects"],
    children: [
      {
        classList: ["__title"],
        children: [
          {
            text: "My Projects!",
          },
        ],
      },
      {
        classList: ["__list"],
        children: projects.map((project) => ({
          classList: ["__project"],
          style: project.image ? { backgroundImage: `url(${project.image})` } : undefined,
          onclick: () => {
            openNode({
              name: project.name,
              source: project.source,
            })
          },
          children: [
            {
              classList: ["__overlay"],
              children: [
                {
                  classList: ["__spacer"],
                },
                {
                  classList: ["__info"],
                  children: [
                    {
                      classList: ["__name"],
                      text: project.name,
                    },
                    {
                      classList: ["__description"],
                      text: project.description,
                    },
                    (project.tags && {
                      classList: ["__tags"],
                      children: project.tags.map((tag) => ({
                        classList: ["__tag"],
                        text: tag,
                      })),
                    })
                  ]
                }
              ]
            }
          ]
        })),
      },
    ],
  });
}
