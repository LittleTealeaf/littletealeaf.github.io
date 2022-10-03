function render_resume(resume) {
  const __contact_id = getFileById("contact");

  const dom = render_dom({
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
      component_details("Education", {
        classList: ["__education"],
      }),
      {
        classList: ["__footer"],
        children: [
          {
            classList: ["__footer_contact"],
            children: [component_button("Contact Me!", () => openFile(__contact_id))],
          },
        ],
      },
    ],
  });

  return dom;
}

