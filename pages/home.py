from libs import *

# TODO build home page


def build():

    github = getGithubApi("/users/LittleTealeaf")

    return page(
        "Home",
        node(
            classList="_home",
            children=[
                node(
                    tag="img",
                    src=export_any_image(github['avatar_url'])
                ),
                node(
                    tag="h1",
                    text="Hello! I'm Thomas Kwashnak, and welcome to my portfolio!"
                ),
                node(
                    tag="h3",
                    text="Feel free to explore with the drawer on the left!"
                ),
                node(
                    tag="h3",
                    text="Please keep in mind that this site may be a work in progress"
                )
            ]
        ),
        id="home",
    )
