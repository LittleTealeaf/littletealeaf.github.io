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
                        {
                            "component": "button",
                            "href": "mailto:thomaskwashnak@gmail.com",
                            "target": "_blank",
                            "text": "Email Me",
                        },
                        {
                            "component": "button",
                            "href": "https://www.linkedin.com/in/thomas-kwashnak",
                            "target": "_blank",
                            "text": "LinkedIn",
                        },
                    ],
                ),
            ],
        ),
        id="contact",
    )
