fetch("./resources/data/stats.json")
  .then(promiseJson)
  .then((data) => {
    const element = document.getElementById("stats");

    const categories = Object.entries(data.waka).map(([key, value]) => ({
      element: createElement({
        content: key,
        classList: "tab",
      }),
      data: value,
    }));

    const content = createElement({
      classList: "content",
    });

    function createTable(rows) {
      return createElement({
        node: "table",
        content: rows,
      });
    }

    function createRow(values) {
      return createElement({
        node: "tr",
        content: values.map((value) =>
          createElement({
            node: "td",
            content: value,
          })
        ),
      });
    }

    categories.forEach(({ element, data }) => {
      element.onclick = (action) => {
        categories.forEach((e) => delete e.element.dataset.selected);
        element.dataset.selected = "";

        content.innerHTML = "";

        data.projects.forEach((project) => {
          if (project.url) {
            project.name = createElement({
              node: "a",
              href: project.url,
              content: project.name,
              target: "_blank",
            });
          }
        });

        //Edit projects to have their name be elements if they have a link
        const data_categories = [
          {
            name: "Activity",
            data: data.categories,
          },
          {
            name: "Projects",
            data: data.projects,
          },
          {
            name: "Languages",
            data: data.languages,
          },
          {
            name: "Editors",
            data: data.editors,
          },
          {
            name: "Operating Systems",
            data: data.operating_systems,
          },
        ];

        content.append(
          createElement({
            content: [createTable([createRow(["Total Time", data.total_time]), createRow(["Average Time", data.daily_average])])],
          })
        );

        data_categories.forEach((category) => {
          let max_percent = 0;
          category.data.forEach(({ percent }) => {
            if (max_percent < percent) {
              max_percent = percent;
            }
          });

          category.data.forEach((entry) => {
            entry.relative_percent = entry.percent / max_percent;
          });

          category.element = createElement({
            content: createTable([
              createElement({
                node: "tr",
                classList: "bold",
                content: [
                  createElement({
                    node: "td",
                    content: category.name,
                  }),
                  createElement({
                    node: "td",
                    content: "Time",
                  }),
                  createElement({
                    node: "td",
                    content: "Percent",
                  }),
                ],
              }),
              ...category.data.map((value) => createRow([value.name, value.digital, `${value.percent}%`, "#".repeat(Math.ceil(value.relative_percent * 10))])),
            ]),
          });
        });

        data_categories.forEach((category) => content.append(category.element));
      };
    });

    categories[0].element.onclick();

    element.append(
      createElement({
        classList: "window",
        content: [
          createElement({
            classList: "header",
            content: categories.map((category) => category.element),
          }),
          content,
        ],
      })
    );
  });
