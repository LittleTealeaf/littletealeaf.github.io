import libs.github as Github
import libs.generated as gen
import libs.config as conf
import json

gen.initialize()

index = {}

# index['projects'] = conf.getFiles('projects')
# index['blogs'] = conf.getFiles('blogs')

index['projects'] = []
for project_path in conf.getFiles('projects'):
    project = conf.getJSON(*project_path)

    project['github']['api'] = Github.getAPI(f"https://api.github.com/repos/{project['github']['repo']}")
    project['github']['languages'] = Github.getAPI(project['github']['api']['languages_url'])

    index['projects'].append(gen.refjson(project,'pages','projects',project_path[-1]))


gen.refjson(index,'index.json')