(() => {
    const backgrounds = document.getElementsByClassName("scaleimage");

    for (let i = 0; i < backgrounds.length; i++) {
        const element = backgrounds.item(i);
        if (element != null) {
            const imageRatio = element.dataset.imageHeight / element.dataset.imageWidth;

            function handleResize() {
                if (element.clientHeight / element.clientWidth < imageRatio) {
                    element.dataset.ratio = "horizontal";
                } else {
                    element.dataset.ratio = "vertical";
                }
            }

            handleResize();

            window.addEventListener("resize", () => handleResize());
        }
    }
})();
