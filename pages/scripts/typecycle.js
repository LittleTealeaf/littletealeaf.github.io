(() => {
    const elements = document.getElementsByClassName("typecycle");

    for (var i = 0; i < elements.length; i++) {
        const element = elements.item(i);

        const text = document.createElement("span");
        element.append(text);

        const cursor = document.createElement("span");
        cursor.innerText = "|";
        cursor.classList.add("cursor");
        element.append(cursor);

        const values = JSON.parse(element.dataset.words);
        var index = values.length - 1;
        var pos = 1;

        var interval;

        function tickType() {
            pos++;
            text.innerText = values[index].substring(0, pos);
            if (pos == values[index].length) {
                clearInterval(interval);
                setTimeout(() => {
                    interval = setInterval(tickDelete, 600 / values[index].length);
                }, 500);
            }
        }

        function tickDelete() {
            pos--;
            text.innerText = values[index].substring(0, pos);
            if (pos == 0) {
                index = (index + 1) % values.length;
                clearInterval(interval);
                interval = setInterval(tickType, 1000 / values[index].length);
            }
        }
        tickDelete();
    }

})();
