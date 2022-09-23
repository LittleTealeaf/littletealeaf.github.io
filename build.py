from libs import *

reset_export()

github_api = getGithubApi("/users/LittleTealeaf")


ABOUT_ME = page(
    "About Me",
    {
        "classList": ["__about-me"],
        "children": [
            {
                "classList": ["__header"],
                "children": [
                    {
                        "tag": "img",
                        "src": export_online_image(github_api["avatar_url"]),
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




export_tree([
    ABOUT_ME
])
