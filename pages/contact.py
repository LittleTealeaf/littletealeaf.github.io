from libs import *

# TODO build contact page


def build():
    return page(
        "Contact Me",
        node(
            classList="&",
            amp="_contact",
            children=[
                node(tag="h1", text="Contact Me!"),
                node(
                    classList="&_options",
                    children=[
                        button(
                            href="mailto:thomaskwashnak@gmail.com",
                            target=TARGET_BLANK,
                            text="Email Me",
                        ),
                        button(
                            href="https://www.linkedin.com/in/thomas-kwashnak",
                            target=TARGET_BLANK,
                            text="Connect on LinkedIn",
                        ),
                    ],
                ),
            ],
        ),
        id="contact",
    )
