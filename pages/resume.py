from libs import *


# TODO build resume page

def build():
  with open('./resources/resume.json') as file:
    return page("Resume",json.load(file),"resume",id="resume")
