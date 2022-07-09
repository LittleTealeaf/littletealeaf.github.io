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

        var days = Math.floor((now.getTime() - birthdate.getTime()) / (24 * 3600 * 1000));

        var months = (() => {
            var months = 0;

            const DAYS_IN_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];

            var year = 2002;
            var month = 4;

            const getDays = (month,year) => {
                if(year%4==0 && month == 1) {
                    return DAYS_IN_MONTH[month] + 1;
                } else {
                    return DAYS_IN_MONTH[month]
                }
            }

            while(days - getDays(month,year) > 0) {
                days -= getDays(month,year);
                months++;
                month++;
                if(month >= 12) {
                    month = 0;
                    year++;
                }
            }
            return months;
        })();

        console.log(months);

        const years = Math.floor(months / 12);

        months = months % 12;

        return `${years}y ${months}m ${days}d`;
    })();




    addField("Status", "Student at Quinnipiac University");
    addField("Majors", "Computer Science, Data Science");
    addField("Minors", "Economics");
    addField("Uptime",uptime);
    addField("OS", "Windows 11, Linux (Ubuntu 22.04)");
    addField("Github Repos", data.repo_count);
  });
