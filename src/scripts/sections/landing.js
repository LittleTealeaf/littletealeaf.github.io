{

    let content = document.querySelector("#landing .theme-dropdown .dropdown-content");

    if(!content) {throw new Error("Could not find Theme Content")}

    for(const theme of THEMES) {
        const entry = document.createElement("a");
        entry.addEventListener("click", () => {
            setTheme(theme);
        });
        entry.dataset.themeOption = theme;
        entry.dataset.selected = "false";
        entry.innerText = theme;
        content.append(entry);
    }

    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");

        if(!header) {throw new Error("Could not find Header")}

        
    })
}
