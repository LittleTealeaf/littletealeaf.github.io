

(() => {

    const HEADERS = [
        "home", "aboutme"
    ]

    const console_element = document.getElementById("console");

    const response = document.getElementById("console_response");
    const input = document.getElementById("console_input");

    const history = [];
    var history_index = -1;



    document.onkeydown = (event) => {
        if (event.key == '`' && event.ctrlKey) {
            if (console_element.dataset.consolehide == null) {
                console_element.dataset.consolehide = "";
            } else {
                delete console_element.dataset.consolehide;
                document.getElementById("console_input").focus();
            }
        }
    }

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

    })


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

        switch (args[0]) {
            case "goto":
                if (args[1] == "-l" || args[1] == "--list") {
                    addLine("Goto Sections: ");
                    addLine(HEADERS.join(", "));
                } else {
                    if (HEADERS.includes(args[1])) {
                        document.getElementById(args[1]).scrollIntoView({
                            behavior: "smooth"
                        })
                    } else {
                        addLine(`Error: ${args[1]} is not a valid destination. Type "goto -l" to list valid destinations`, "error")
                    }
                }
                break;
            case "clear":
                response.innerHTML = "";
                break;
            case "help":
            case "?":
            case "h":
                addLine("Commands:", "response");
                addLine("- clear: Clears the console.", "response");
                addLine("- goto: Navigates to a section of the website");
                addLine("- goto (--list, -l): Lists navigatable sections");
                break;
            default:
                addLine(`Command not recognized: '${args[0]}'. Type "help", "h" or "?" for assistance`, "error")
        }

        input.focus();
    }

})()
