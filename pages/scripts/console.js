(() => {
  const HEADERS = ["home", "aboutme"];

  const CMDS = [
    {
      keys: ["help", "?", "h"],
      description: "Displays Available Commands",
      execute: (args) => {
        addLine("Available Commands:");
        CMDS.forEach((command) => {
          addLine(` - ${command.keys[0]}: ${command.description}`);
        });
      },
    },
    {
      keys: ["clear"],
      description: "Clears the terminal",
      execute: (args) => {
        response.innerHTML = "";
      },
    },
    {
      keys: ["goto"],
      description: "Navigates to a specified section of the page",
      execute: (args) => {
        if (args.length == 1) {
          addLine(`Error: A destination must be provided. Type "goto -l" to list valid destinations`, "error");
        } else if (args[1] == "-l" || args[1] == "--list") {
          addLine("Available Sections: ");
          addLine(HEADERS.join(", "));
        } else {
          if (HEADERS.includes(args[1])) {
            document.getElementById(args[1]).scrollIntoView({
              behavior: "smooth",
            });
          } else {
            addLine(`Error: ${args[1]} is not a valid destination. Type "goto -l" to list valid destinations`, "error");
          }
        }
      },
    },
    {
      keys: ["exit", "quit"],
      description: "Closes the terminal",
      execute: (args) => {
        console_element.dataset.consolehide = "";
      },
    },
  ];

  const COMMANDS = {
    clear: {
      description: "Clears the terminal",
      execute: (args) => {
        response.innerHTML = "";
      },
    },
    goto: {
      description: "Navigates to a specified section of the page",
      execute: (args) => {
        if (args.length == 1) {
          addLine(`Error: A destination must be provided. Type "goto -l" to list valid destinations`, "error");
        } else if (args[1] == "-l" || args[1] == "--list") {
          addLine("Available Sections: ");
          addLine(HEADERS.join(", "));
        } else {
          if (HEADERS.includes(args[1])) {
            document.getElementById(args[1]).scrollIntoView({
              behavior: "smooth",
            });
          } else {
            addLine(`Error: ${args[1]} is not a valid destination. Type "goto -l" to list valid destinations`, "error");
          }
        }
      },
    },
    exit: {
      description: "Exits the terminal",
      execute: (args) => {
        console_element.dataset.consolehide = "";
      },
    },
  };

  const console_element = document.getElementById("console");

  const response = document.getElementById("console_response");
  const input = document.getElementById("console_input");

  console_element.addEventListener("click", (event) => {
    input.focus();
  });

  const history = [];
  var history_index = -1;

  document.onkeydown = (event) => {
    if (event.key == "`" && event.ctrlKey) {
      if (console_element.dataset.consolehide == null) {
        console_element.dataset.consolehide = "";
      } else {
        delete console_element.dataset.consolehide;
        document.getElementById("console_input").focus();
      }
    }
  };

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && input.value != "") {
      event.preventDefault();
      execute(input.value);
      input.value = "";
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp" && history_index < history.length - 1) {
      history_index++;
      input.value = history[history_index];
    } else if (event.key == "ArrowDown" && history_index > -1) {
      history_index--;
      if (history_index != -1) {
        input.value = history[history_index];
      } else {
        input.value = "";
      }
    }
  });

  function addLine(content, type) {
    const div = document.createElement("div");
    div.append(content);
    div.dataset.response = type;
    response.append(div);
  }

  function execute(command) {
    // put command on stack
    history.unshift(command);
    addLine("> " + command, "");

    const args = command.split(" ");
    console.log(HEADERS[args[0]]);

    const cmdlist = CMDS.filter((cmd) => cmd.keys.includes(args[0]));
    if (cmdlist.length > 0) {
      cmdlist[0].execute(args);
    } else {
      addLine(`Command not recognized: '${args[0]}'. Type "help", "h" or "?" for assistance`, "error");
    }
  }
})();
