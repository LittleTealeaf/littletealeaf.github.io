(() => {
  const element = document.getElementById("console");

  const response = document.createElement("div");
  response.classList.add("response");
  element.append(response);

  const input = (() => {
    const div = document.createElement("div");
    div.classList.add("prompt");

    const span = document.createElement("span");
    span.innerText = " >";
    div.append(span);

    const prompt = document.createElement("input");
    prompt.type = "text";
    prompt.ariaLabel = "Console Input";
    prompt.spellcheck = false;
    div.append(prompt);

    element.append(div);

    return prompt;
  })();

  element.addEventListener("click", (event) => {
    input.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key == "`") {
      if (element.dataset.hide != null) {
        delete element.dataset.hide;
        input.focus();
      } else {
        element.dataset.hide = "";
      }
    }
  });

  let COMMANDS;

  function output(content, type) {
    const div = document.createElement("div");
    div.append(content);
    if (type != null) {
      div.dataset.type = type;
    }
    response.append(div);
    div.focus();
  }

  function execute(args) {
    for (const command of COMMANDS) {
      if (command.keys.includes(args[0])) {
        command.fun(args);
        return;
      }
    }
    output(`Error: Command "${args[0]}" not recognized. Type "help" or "?" to view a list of commands`, "error");
  }

  input.addEventListener("keydown", (event) => {
    if (event.key == "Enter" && input.value != "") {
      event.preventDefault();
      const value = input.value;
      input.value = "";
      output(" > " + value);
      execute(value.split(" "));
    }
  });

  COMMANDS = [
    {
      name: "help",
      keys: ["help", "h", "?"],
      description: "Displays available commands and their descriptions",
      fun: (args) => {
        output("Available Commands:");
        COMMANDS.forEach((command) => {
          output(` - ${command.name}: ${command.description}`);
        });
      },
    },
    {
      name: "clear",
      keys: ["clear"],
      description: "Clears the Terminal",
      fun: (args) => {
        response.innerHTML = "";
      },
    },
    {
      name: "goto",
      keys: ["goto", "gt", "g"],
      description: "Navigates to a page section",
      fun: (args) => {
        const locations = ["home", "aboutme"];

        if (args.includes("-l") || args.includes("--list")) {
          output("Available Locations:");
          output(locations.join(", "));
        } else if (args.length == 1) {
          output('Error: No Destination Specified. Type "goto -l" to view destinations and "goto {location}" to navigate to one.', "error");
        } else if (locations.includes(args[1])) {
          document.getElementById(args[1]).scrollIntoView({
            behavior: "smooth",
          });
        } else {
          output(`Error: Destination "${args[1]}" not recognized. Type \"goto -l\" to see a list of destinations`, "error");
        }
      },
    },
  ];
})();
