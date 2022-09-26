function render_project_content(project) {
  return project.content.map((content) => {
    switch (content.type) {
      case "text": {
        return {
          classList: ["__text"],
          tag: "p",
          text: content.text,
        };
      }
      case "image": {
        return {
          classList: ["labeled_image"],
          style: {
            backgroundImage: `url(${content.src})`,
            maxHeight: `${content.height}px`,
            maxWidth: `${content.width}px`,
            height: `${(content.height / content.width) * 100}vw`,
          },
          children: [
            {
              classList: ["-overlay"],
              children: [
                {
                  classList: ["-content"],
                  children: [
                    {
                      classList: ["-spacer"],
                    },
                    {
                      classList: ["-label"],
                      children: [
                        {
                          classList: ["__label"],
                          text: content.label,
                        },
                        {
                          tag: "a",
                          href: content.src,
                          classList: ["__link"],
                          text: "View Full Size",
                          target: "_blank",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        };
      }
    }
    return undefined;
  })
}

function render_project(project) {
  const links = project.links
    ? {
        classList: ["__links"],
        children: project.links.map(({ name, url }) => ({
          tag: "a",
          href: url,
          text: name,
          target: "_blank",
        })),
      }
    : undefined;

  const content = render_project_content(project);


  const tags = project.tags
  ? {
      classList: ["__tags"],
      children: project.tags.map((tag) => ({
        classList: ["__tag"],
        text: tag,
      })),
    }
  : undefined;

  return render_dom({
    classList: ["_project"],
    children: [
      {
        classList: ["__title"],
        text: project.name,
      },
      tags,
      ...content,
      links
    ],
  });
}

function render_project_list(projects) {
  // TODO: add filter

  return render_dom({
    classList: ["_all_projects"],
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
              renderer: "project",
            });
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
                    project.tags && {
                      classList: ["__tags"],
                      children: project.tags.map((tag) => ({
                        classList: ["__tag"],
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
