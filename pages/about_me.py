from libs import *

# TODO build about me page

def build():
  return page("About Me",{
    "classList": ["_about"],
    "children": [
      {
        "tag": "h1",
        "text": "hello world"
      }
    ]
  })
