from libs import *

# TODO build home page


def build():

    github = getGithubApi("/users/LittleTealeaf")

    return page(
        "Home",
        {
            "classList": "_home",
            "children": [
                {"tag": "img", "src": export_any_image(github["avatar_url"]),},
                {
                    "tag": "h1",
                    "text": "Hello! I'm Thomas Kwashnak, and welcome to my Portfolio",
                },
                {
                    "tag": "h3",
                    "text": "Feel free to explore with the drawer on the left!",
                },{
                    "tag": "h3",
                    "text": "Please keep in mind that this site may be a work in progress!"
                }
            ],
        },
        id="home",
    )
