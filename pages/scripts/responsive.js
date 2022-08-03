(() => {
    const backgrounds = document.getElementsByClassName("responsivebackground");

    for (var i = 0; i < backgrounds.length; i++) {
        const element = backgrounds.item(i);
        if (element != null) {
            const imageRatio = element.dataset.imageHeight / element.dataset.imageWidth;

            function handleResize() {
                if (element.clientHeight / element.clientWidth < imageRatio) {
                    element.dataset.orientation = "horizontal";
                } else {
                    element.dataset.orientation = "vertical";
                }
            }

            handleResize();

            window.addEventListener("resize", () => handleResize());
        }
    }
})();
