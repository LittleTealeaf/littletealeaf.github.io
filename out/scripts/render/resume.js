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
          classList: ["_education"]
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
