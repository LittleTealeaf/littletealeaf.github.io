function render_resume(resume) {
  const __contact_id = getFileById("contact");

  const dom = render_dom({
    classList: "&",
    amp: "_resume",
    children: [
      {
        classList: "&",
        amp: "&_header",
        children: [
          {
            classList: "&_name",
            children: resume.name.split(" ").map((word) => ({
              text: word,
            })),
          },
        ],
      },
      {
        component: "details",
        title: "Education",
        content: {
          classList: "&",
          amp: "&_edu",
          children: resume.education.map((school) => ({
            children: [
              {
                classList: "_resume_keyvalue",
                children: [
                  {
                    style: {
                      fontSize: "20px",
                    },
                    tag: "span",
                    text: school.school,
                  },
                  {
                    tag: "span",
                    text: school.location,
                  },
                ],
              },
              {
                classList: "&_details",
                children: [
                  {
                    classList: "_resume_keyvalue",
                    children: [
                      {
                        tag: "span",
                        text: "Expected",
                      },
                      {
                        tag: "span",
                        text: school.graduation,
                      },
                    ],
                  },
                  {
                    classList: "_resume_keyvalue",
                    children: [
                      {
                        tag: "span",
                        text: "Degree",
                      },
                      {
                        text: school.degrees.join(", "),
                      },
                    ],
                  },
                ],
              },
            ],
          })),
        },
      },
      {
        component: "details",
        title: "Skills",
        content: {
          classList: "&",
          amp: "&_skills",
          children: Object.entries(resume.skills).map(([key,values]) => ({
            classList: ["_resume_keyvalue", "&_entry"],
            children: [
              {
                tag: "span",
                text: key
              },
              {
                tag: "span",
                text: values.join(", ")
              }
            ]
          }))
        },
      },
      {
        classList: "&",
        amp: "&_footer",
        children: [
          {
            classList: ["&_content"],
            children: [
              {
                component: "button",
                text: "Contact Me!",
                onclick: (_) => openFile(__contact_id),
              }
            ],
          },
        ],
      },
    ],
  });

  return dom;
}
