(() => {
    const elements = document.getElementsByClassName("typewriter");

    class TypeWriter {
        constructor(element) {
            this.element = element;

            this.text = document.createElement("span");

            const cursor = document.createElement("span");
            cursor.innerText = "|";
            cursor.classList.add("cursor");

            this.element.append(this.text, cursor);

            this.words = JSON.parse(element.dataset.words);
            this.index = 0;
            this.pos = 0;

            this.typeTime = element.dataset.typeTime || 600;
            this.deleteTime = element.dataset.deleteTime || 1000;
            this.waitTime = element.dataset.waitTime || 1000;

            this.interval = setInterval(() => this.tickType(),this.typeTime / this.words[this.index].length);
        }

        tickType() {
            this.pos++;



            this.text.innerText = this.words[this.index].substring(0, this.pos);

            if(this.pos == this.words[this.index].length) {
                clearInterval(this.interval);
                setTimeout(() => {
                    this.interval = setInterval(() => this.tickDelete(),this.deleteTime / this.words[this.index].length);
                },this.waitTime);
            }
        }

        tickDelete() {
            this.pos--;
            this.text.innerText = this.words[this.index].substring(0, this.pos);

            if(this.pos == -1) {
                clearInterval(this.interval);
                this.index = (this.index + 1)%this.words.length;

                this.interval = setInterval(() => this.tickType(),this.typeTime / this.words[this.index].length);
            }
        }

    }

    for (var i = 0; i < elements.length; i++) {
        new TypeWriter(elements.item(i));
        // (() => {
        //     const element = elements.item(i);

        //     const text = document.createElement("span");

        //     const cursor = document.createElement("span");
        //     cursor.innerText = "|";
        //     cursor.classList.add("cursor");

        //     element.append(text, cursor);
        // })();
    }
})();
