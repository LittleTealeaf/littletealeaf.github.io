from libs import *

# TODO build about me page


def build():
    return page(
        "About Me",
        node(
            classList="_about",
            children=[
                node(
                    tag="h1",
                    text="About Me",
                ),
                node(
                    text="More to come soon!"
                )
            ]
        ),
        id="about",
    )
