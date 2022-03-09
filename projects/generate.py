import json, os

projects_file = open('./assets/projects.json')
projects = json.load(projects_file)
projects_file.close()

print(projects)