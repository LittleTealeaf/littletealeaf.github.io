import libs.github as Github
from libs.generated import Gen, gen_initialize
import libs.config as conf
import json

gen_initialize()

index = {}

index['projects'] = []
for project_path in conf.getFiles('projects'):
    project = conf.getJSON(*project_path)

    project['github']['api'] = Github.getAPI(f"https://api.github.com/repos/{project['github']['repo']}")
    project['github']['languages'] = Github.getAPI(project['github']['api']['languages_url'])
    project['github']['contributors'] = Github.getAPIList(project['github']['api']['contributors_url'])

    index['projects'].append(Gen('pages','projects',project_path[-1]).ref_json(project))


Gen('index').ref_json(index)