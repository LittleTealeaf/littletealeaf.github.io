fetch("generated/neofetch.json")
  .then((response) => response.json())
  .then((data) => {
    const element = document.getElementById("neofetch_data");


    const title = document.createElement("div");
    title.innerText = "Thomas Kwashnak";
    title.classList.add("colored");

    element.append(title);

    const header_line = document.createElement("hr");
    element.append(header_line);

    function addField(key, value) {
      const div = document.createElement("div");

      const label = document.createElement("span");
      label.classList.add("label");
      label.classList.add("colored");
      label.innerHTML = key;

      const value_text = document.createElement("span");
      value_text.innerText = value;

      div.append(label, value_text);
      element.append(div);
    }

    const uptime = (() => {
      //Birthday's actually may 28th, but I set it to be the next month and just add 2 days
      const birthdate = new Date(2002, 5, 0);
      const now = new Date(Date.now());

      var days = Math.floor((now.getTime() - birthdate.getTime()) / (24 * 3600 * 1000));

      var months = (() => {
        var months = 0;

        const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        var year = 2002;
        var month = 4;

        const getDays = (month, year) => {
          if (year % 4 == 0 && month == 1) {
            return DAYS_IN_MONTH[month] + 1;
          } else {
            return DAYS_IN_MONTH[month];
          }
        };

        while (days - getDays(month, year) > 0) {
          days -= getDays(month, year);
          months++;
          month++;
          if (month >= 12) {
            month = 0;
            year++;
          }
        }
        return months;
      })();

      const years = Math.floor(months / 12);

      months = months % 12;

      return `${years}y ${months}m ${days + 2}d`;
    })();

    addField("Status", "Student at Quinnipiac University");
    addField("Graduating Class","2024");
    addField("Majors", "Computer Science, Data Science");
    addField("Minors", "Economics");
    addField("Uptime", uptime);
    addField("Rubik's Cube Record","15.86s");
    addField("Rubik's Cube Average","29.71s")
    addField("D&D Status","Dungeon Master");
    addField("Tang Soo Do Rank","3rd Degree Black Belt")
    addField("Outdoor Activity","Hiking");
    addField("Operating Systems", "Windows 11, Ubuntu 22.04");
    addField("Video Games", "Dungeons & Dragons: Online, Minecraft, World of Tanks, Warframe");
    addField("Github Repos", data.repo_count);
  });
