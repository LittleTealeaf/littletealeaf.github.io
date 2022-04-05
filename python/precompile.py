from pathlib import Path
import libs.github as Github
from libs.generated import Gen, gen_initialize
import libs.config as conf
import os
import json

gen_initialize()

index = {}

index['pages'] = {}
projects = {}
for project_path in conf.getFiles('projects'):
    project = conf.getJSON(*project_path)

    project['github']['api'] = Github.getAPI(
        f"https://api.github.com/repos/{project['github']['repo']}")
    project['github']['languages'] = Github.getAPI(
        project['github']['api']['languages_url'])
    project['github']['contributors'] = Github.getAPIList(
        project['github']['api']['contributors_url'])

    projects[Path(project_path[-1]).stem] = Gen('pages',
                                                'projects', project_path[-1]).ref_json(project)
index['pages']['projects'] = Gen('pageindexes', 'projects').ref_json(projects)

index['analytics'] = Gen('analytics').ref_json({
    'github': {
        'api': Github.getAnalytics(),
        'rate_limits': Github.getAPI('https://api.github.com/rate_limit', expires=-1)
    }
})

Gen('index').ref_json(index)
