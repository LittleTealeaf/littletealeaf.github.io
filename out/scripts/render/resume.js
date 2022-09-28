function render_resume(resume) {
  const __contact_id = getFileById("contact");

  return render_dom({
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
        classList: ["__footer"],
        children: [
          {
            classList: ["__footer_contact"],
            children: [
              {
                classList: ["button"],
                text: "Contact Me!",
                onclick: () => {
                  openFile(__contact_id);
                },
              },
            ],
          },
        ],
      },
    ],
  });
}
