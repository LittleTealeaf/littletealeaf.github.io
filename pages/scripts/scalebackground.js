(() => {
    for(const element of document.getElementsByClassName("scalebackground")) {
        if(element != null) {
            const imageRatio = element.dataset.imageHeight / element.dataset.imageWidth;

            function handleResize() {
                if(element.clientHeight / element.clientWidth < imageRatio) {
                    element.dataset.imageStretch = "horizontal"
                } else {
                    element.dataset.imageStretch = "vertical"
                }
            }

            handleResize();

            window.addEventListener("resize",handleResize);
        }
    }
})();
