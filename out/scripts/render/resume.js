function render_resume({ name, education, experience, skills }) {
  const __contact_id = getFileById("contact");

  return render_dom({
    classList: "&",
    amp: "_resume",
    children: [
      {
        classList: "&",
        amp: "&_header",
        children: [
          {
            classList: "&_name",
            children: name.split(" ").map((word) => ({
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
          children: education.map(({ school, location, graduation, degrees }) => ({
            children: [
              {
                classList: "_resume_keyvalue",
                children: [
                  {
                    style: {
                      fontSize: "20px",
                    },
                    tag: "span",
                    text: school,
                  },
                  {
                    tag: "span",
                    text: location,
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
                        text: graduation,
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
                        text: degrees.join(", "),
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
        title: "Experience",
        content: {
          classList: "&",
          amp: "&_experience",
          children: experience.map(({ title, time, subtitle, details, skills, location }) => ({
            classList: "&_entry",
            children: [
              {
                classList: "&_title",
                children: [
                  {
                    text: title,
                  },
                  experience.time && {
                    text: time,
                  },
                ], 
              },
              {
                classList: "&_subtitle",
                text: subtitle || location || "",
              },
              {
                classList: "&_details",
                tag: "ul",
                children: details.map((detail) => ({
                  tag: "li",
                  text: detail,
                })),
              },
              {
                classList: "&_skills",
                children: [
                  {
                    text: "Skills:",
                  },
                  ...skills
                    .join(",, ")
                    .split(", ")
                    .map((skill) => ({
                      text: skill,
                    })),
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
          children: Object.entries(skills).map(([key, values]) => ({
            classList: ["_resume_keyvalue", "&_entry"],
            children: [
              {
                tag: "span",
                text: key,
              },
              {
                tag: "span",
                text: values.join(", "),
              },
            ],
          })),
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
              },
            ],
          },
        ],
      },
    ],
  });
}
