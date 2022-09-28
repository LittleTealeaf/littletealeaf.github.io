function render_resume(resume) {

  const __contact_me_index = findFile("Contact Me");

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
                classList: ["__button"],
                text: "Contact Me!",
                onclick: () => {

                }
              },
            ]
          }
        ]
      },
    ],
  });
}
