fetch("generated/neofetch.json")
  .then((response) => response.json())
  .then((data) => {
    const element = document.getElementById("neofetch_data");

    const title = (() => {
      const div = document.createElement("div");

      const user = document.createElement("span");
      user.classList.add("colored");
      user.innerText = "tealeaf";

      const symbol = document.createElement("span");
      symbol.innerText = "@";

      const location = document.createElement("span");
      location.classList.add("colored");
      location.innerText = "littletealeaf.github.io";

      div.append(user, symbol, location);
      return div;
    })();
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
        const birthdate = new Date(2002,4,28);
        const now = new Date(Date.now());


        //TODO CUSTOM DATE STUFF YEA OK
        const years = now.getFullYear() - birthdate.getFullYear();
        var months = now.getMonth() - new Date(now.getFullYear(),4,28).getMonth() - 1;

        var days = Math.floor(((now.getTime() - birthdate.getTime()) / (24 * 60 * 60 * 1000)) -(365.25 * years + months * 31));

        if(days < 0) {
            days += 31;
            months--;
        }

        return `${years}y ${months}m ${days}d`;
    })();




    addField("Status", "Student at Quinnipiac University");
    addField("Majors", "Computer Science, Data Science");
    addField("Minors", "Economics");
    addField("OS", "Windows 11, Linux (Ubuntu 22.04)");
    addField("Github Repos", data.repo_count);
    addField("Uptime",uptime);
  });
