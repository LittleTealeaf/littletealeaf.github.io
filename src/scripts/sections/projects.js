(() => {
  const archive = document.querySelector("#projects .archive");

  document.querySelector("#projects .toggle-archive").addEventListener("click", () => {
    archive.dataset.show = archive.dataset.show != "true";
  });

  fetch("data/projects.json")
    .then((res) => res.json())
    .then((data) => {
      const list = document.querySelector("#projects .active");
      const archive = document.querySelector("#projects .archive");
      if (list == null || archive == null) {
        return;
      }

      data.forEach((project) => {
        const container = document.createElement("div");
        container.classList.add("project");
        {
          const summary = document.createElement("a");
          summary.classList.add("summary");
          {
            const name = document.createElement("div");
            name.innerText = project.name;
            name.classList.add("name");
            summary.append(name);

            const space = document.createElement("div");
            space.classList.add("space");
            summary.append(space);

            const icons = document.createElement("icons");
            icons.classList.add("icons");
            project.icons.forEach((className) => {
              const icon = document.createElement("div");
              icon.classList.add("nf", className);
              icons.append(icon);
            });
            summary.append(icons);
          }
          container.append(summary);
        }

        {
          const content = document.createElement("div");
          content.classList.add("content");

          {
            const links = document.createElement("div");
            links.classList.add("links");

            project.links.forEach(({ icon, label, url }) => {
              const link = document.createElement("a");
              link.href = url;
              const icon_element = document.createElement("span");
              icon_element.classList.add("nf", icon);
              link.append(icon_element);

              const label_element = document.createElement("span");
              label_element.innerText = ` ${label}`;
              link.append(label_element);

              links.append(link);
            });

            content.append(links);
          }

          project.description.forEach((text) => {
            const element = document.createElement("p");
            element.innerText = text;
            content.append(element);
          });

          container.append(content);
        }

        (project.archive ? archive : list).append(container);
      });

      const projects = document.querySelectorAll("#projects .project");

      projects.forEach((project) => {
        project.dataset.selected = false;

        project.querySelector(".summary")?.addEventListener("click", () => {
          const open = project.dataset.selected;
          projects.forEach((p) => {
            p.dataset.selected = false;
          });
          project.dataset.selected = open != "true";
        });
      });
    });
})();
