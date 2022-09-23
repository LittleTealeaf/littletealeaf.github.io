from libs import *

def build_project_page(project):

  return page(project['name'],{

  },'project')

def build():

  projects = []

  # loop through all json files in projects folder
  for file in os.listdir('resources/projects'):
    if file.endswith('.json'):
      with open('resources/projects/' + file) as f:
        projects.append(json.load(f))




  return folder("Projects",[
    page("All Projects",{},),
    *[build_project_page(project) for project in projects]
  ])
