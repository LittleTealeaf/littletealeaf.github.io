from libs import *

# TODO build about me page

def build():
  return page("About Me",{
    "classList": ["_about"],
    "children": [
      {
        "tag": "h1",
        "text": "About Me"
      },
      {
        "text": "More to come soon!"
      }
    ]
  },id="about")
