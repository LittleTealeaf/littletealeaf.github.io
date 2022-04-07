from pathlib import Path
import libs.github as Github
from libs.generated import Gen, gen_initialize
import libs.config as conf
import frontmatter
import markdown
import os
import json
import shutil

MARKDOWN_EXTENSIONS = ['tables','fenced_code']

gen_initialize()

if 'RUN_NUMBER' in os.environ and int(os.environ['RUN_NUMBER']) % 100 == 0:
    print("Cleaning Caches")
    caches = [
        os.path.join('.', 'cache')
    ]

    for cache in caches:
        shutil.rmtree(cache)
        os.makedirs(cache, exist_ok=True)
else:
    print("Skipping Cache Clearing")


index = {
    'pages': {
        'blogs': {},
        'projects': {},
        'repositories': {}
    }
}
for project_path in conf.getFiles('projects'):
    project = conf.getJSON(*project_path)

    project['github']['api'] = Github.getAPI(
        f"https://api.github.com/repos/{project['github']['repo']}")
    project['github']['languages'] = Github.getAPI(
        project['github']['api']['languages_url'])
    project['github']['contributors'] = Github.getAPIList(
        project['github']['api']['contributors_url'])
    project['github']['tags'] = Github.getAPIList(project['github']['api']['tags_url'])
    project['github']['events'] = Github.getAPIList(project['github']['api']['events_url'],count=500,expires=6)

    index['pages']['projects'][Path(project_path[-1]).stem] = Gen('pages',
                                                'projects', project_path[-1]).ref_json(project)

for repo_api in Github.getAPIList('https://api.github.com/user/repos'):
    repo = {
        'api': repo_api,
        'languages': Github.getAPI(repo_api['languages_url'])
    }
    index['pages']['repositories'][repo_api['name']] = Gen('pages','repositories',repo_api['name']).ref_json(repo)

# Blogs
for blog_path in conf.getFiles('blogs'):
    md = None
    post = frontmatter.load(conf.getPath(*blog_path)).to_dict()
    index['pages']['blogs'][Path(blog_path[-1]).stem] = Gen('pages','blogs',blog_path[-1]).ref_json(post)

index['analytics'] = Gen('analytics').ref_json({
    'github': {
        'api': Github.getAnalytics(),
        'cache': Github.getAPI('https://api.github.com/repos/LittleTealeaf/littletealeaf.github.io/actions/cache/usage', expires=-1),
        'rate_limits': Github.getAPI('https://api.github.com/rate_limit', expires=-1)
    }
})

Gen('index').ref_json(index)
