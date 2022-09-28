from libs import *

# TODO build home page

def build():

  github = getGithubApi("https://www.api.github.com/users/LittleTealeaf")
  print(github['avatar_url'])

  return page("Home",{
    "classList": ["_home"],
    "children": [
      {
        "tag": "img",
        "src": export_any_image(github['avatar_url']),
      }
    ]
  })
