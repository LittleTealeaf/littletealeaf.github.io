(() => {

    class Typewriter{
        constructor(element) {
            this.element = element;

            this.text = document.createElement("span");

            const cursor = document.createElement("span");
            cursor.innerText = "|";

            this.element.append(this.text, cursor);

            this.words = this.element.dataset.words.split("|");
            this.index = 0;
            this.position = 0;


            this.typeTime = element.dataset.typeTime || 600;
            this.deleteTime = element.dataset.deleteTime || 1000;
            this.waitTime = element.dataset.waitTime || 1000;


            this.interval = setInterval(() => this.tickType(), this.typeTime / this.words[this.index].length);
        }

        tickType() {
            this.position++;
            this.render();

            if(this.position === this.words[this.index].length) {
                clearInterval(this.interval);
                setTimeout(() => {
                    this.interval = setInterval(() => this.tickDelete(), this.deleteTime / this.words[this.index].length);
                },this.waitTime)
            }

        }

        tickDelete() {
            this.position--;
            this.render();

            if(this.position == -1) {
                clearInterval(this.interval);
                this.index = (this.index + 1) % this.words.length;
                this.interval = setInterval(() => this.tickType(), this.typeTime / this.words[this.index].length);
            }
        }

        render() {
            this.text.innerText = this.words[this.index].substring(0,this.position);
        }
    }



    const elements = document.getElementsByClassName("typewriter");

    for(const element of elements) {
        new Typewriter(element);
    }

})();
