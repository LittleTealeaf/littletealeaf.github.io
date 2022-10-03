function render_resume(resume) {
  const __contact_id = getFileById("contact");

  const dom = render({
    classList: ["_resume"],
    children: [
      {
        classList: ["__header"],
        children: [
          {
            classList: ["__header_name"],
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
          classList: ["__education"],
          children: resume.education.map(school => ({
            children: [
              {
                classList: ["__keyvalue"],
                children: [
                  {
                    style: {
                      fontSize: "20px"
                    },
                    tag: "span",
                    text: school.school
                  },
                  {
                    tag: "span",
                    text: school.location
                  }
                ]
              },
              {
                classList: ["__edu_details"],
                children: [
                  {
                    classList: ["__keyvalue"],
                    children: [
                      {
                        tag: "span",
                        text: "Expected"
                      },
                      {
                        tag: "span",
                        text: school.graduation
                      }
                    ]
                  },
                  {
                    text: school.degrees.join(", ")
                  }
                ]
              }
            ]
          }))
        }
      },
      {
        classList: ["__footer"],
        children: [
          {
            classList: ["__footer_contact"],
            children: [{
              component: "button",
              text: "Contact Me!",
              onclick: (_) => openFile(__contact_id)
            }],
          },
        ],
      },
    ],
  });

  return dom;
}
