from libs import *


def build():
    return page(
        "Home",
        {
            "classList": ["_home"],
            "children": [
                {
                    "classList": ["__header"],
                    "children": [
                        {
                            "tag": "img",
                            "src": export_online_image(getGithubApi("/users/LittleTealeaf")["avatar_url"]),
                            "alt": "avatar",
                        },
                        {"tag": "h1", "text": "Hi! I'm Thomas Kwashnak!"},
                        {"tag": "h2","text": "Welcome to my Portfolio!"},
                        {
                            "tag": "h4",
                            "text": "I'm a Computer Science and Data Science double major at Quinnipiac University. A fun fact about me is that I grew up on Ubuntu Linux! You can find out more about me in the \"About Me\" section! I hope you enjoy my portfolio!",
                        },
                    ],
                }
            ],
        },
        "dom",
    )
