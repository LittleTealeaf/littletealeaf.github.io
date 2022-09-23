from libs import *


def build():
    return page(
        "About Me",
        {
            "classList": ["__about-me"],
            "children": [
                {
                    "classList": ["__header"],
                    "children": [
                        {
                            "tag": "img",
                            "src": export_online_image(getGithubApi("/users/LittleTealeaf")["avatar_url"]),
                            "alt": "avatar",
                        },
                        {"tag": "h1", "text": "Hi! I'm Thomas Kwashnak"},
                        {
                            "tag": "h2",
                            "text": "I'm a Computer Science and Data Science double major at Quinnipiac University.",
                        },
                    ],
                }
            ],
        },
        "dom",
    )
