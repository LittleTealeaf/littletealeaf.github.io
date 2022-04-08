from pathlib import Path

import urllib3
import libs.github as Github
from libs.generated import Gen, gen_initialize
import libs.config as conf
import libs.images as images
import frontmatter

import markdown
import os
import json
import shutil

# file = request.urlopen("https://raw.githubusercontent.com/LittleTealeaf/paceManager/main/.gitignore")

# for line in file:
#     print(line.decode('utf-8'))

MARKDOWN_EXTENSIONS = ['tables', 'fenced_code']

gen_initialize()

index = {
    'pages': {
        'blogs': {},
        'projects': {},
        'repositories': {}
    },
    'github': {

    }
}

for project_path in conf.getFiles('projects'):
    project = conf.getJSON(*project_path)
    if(project['github'] != None):
        # project['github'] = GithubUtil.repo(f"https://api.github.com/repos/{project['github']['repo']}")
        project['github']['api'] = Github.getAPI(
            f"https://api.github.com/repos/{project['github']['repo']}")
        project['github']['languages'] = Github.getAPI(
            project['github']['api']['languages_url'])
        project['github']['contributors'] = Github.getAPIList(
            project['github']['api']['contributors_url'],count=1000)
        project['github']['tags'] = Github.getAPIList(project['github']['api']['tags_url'])
        project['github']['events'] = Github.getAPIList(project['github']['api']['events_url'],count=500)
        project['github']['releases'] = Github.getAPIList(str(project['github']['api']['releases_url']).replace('{/id}',''))
        project['github']['contents'] = Github.getAPI(str(project['github']['api']['contents_url']).replace('{+path}',''))
        for file in project['github']['contents']:
            if str(file['name']).lower() == 'readme.md':
                with urllib3.PoolManager().request('GET',file['download_url'],preload_content=False) as r:
                    project['github']['readme'] = '\n'.join([line.decode('utf-8') for line in r]).replace('\r\n\n','\n')

    index['pages']['projects'][Path(project_path[-1]).stem] = Gen('pages',
                                                'projects', project_path[-1]).ref_json(project)

for repo_api in Github.getAPIList('https://api.github.com/user/repos'):
    repo = {
        'api': repo_api,
        'languages': Github.getAPI(repo_api['languages_url']),
        'releases': Github.getAPIList(str(repo_api['releases_url']).replace('{/id}','')),
        'contributors': Github.getAPIList(repo_api['contributors_url'],count=1000),
        'events':  Github.getAPIList(repo_api['events_url'],count=500)
    }
    index['pages']['repositories'][repo_api['name']] = Gen('pages','repositories',repo_api['name']).ref_json(repo)

# Blogs
for blog_path in conf.getFiles('blogs'):
    md = None
    post = frontmatter.load(conf.getPath(*blog_path)).to_dict()
    index['pages']['blogs'][Path(blog_path[-1]).stem] = Gen('pages','blogs',blog_path[-1]).ref_json(post)

# User
user_api = Github.getAPI('https://api.github.com/user')
user = {
    'api': user_api,
    'events': Gen('github','user','events').ref_json(Github.getAPIList(user_api['events_url'].replace('{/privacy}',''))),
    'followers_url': Gen('github','user','followers').ref_json(Github.getAPIList(user_api['followers_url'],count=1000)),
    'avatar': Gen('github','user','avatar').ref_image(images.get(user_api['avatar_url'],circular=True))
}
index['github']['user'] = Gen('github','user').ref_json(user)


index['analytics'] = Gen('analytics').ref_json({
    'github': {
        'api': Github.getAnalytics(),
        'cache': Github.getAPI('https://api.github.com/repos/LittleTealeaf/littletealeaf.github.io/actions/cache/usage'),
        'rate_limits': Github.getAPI('https://api.github.com/rate_limit')
    }
})

Gen('index').ref_json(index)
