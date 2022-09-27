from libs import *

def build():
  return page("Home",{
    "classList": ["_home"],
    "children": [
      {
        "tag": "h1",
        "text": "hello world"
      }
    ]
  })
