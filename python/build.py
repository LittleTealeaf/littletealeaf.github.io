from pathlib import Path

import urllib3
import libs.github as Github
import libs.githubwrapper as GithubWrapper
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



gen_initialize()

index = {
    'pages': {
        'blogs': {},
        'projects': {},
        'repositories': {}
    },
    'github': {

    },
    'snippets': {}
}

for project_path in conf.getFiles('projects'):
    project = conf.getJSON(*project_path)
    stem = Path(project_path[-1]).stem

    if project['github'] != None:
        api = Github.getAPI(f"https://api.github.com/repos/{project['github']['repo']}")
        project['github'].update({
            'api': api,
            'readme': GithubWrapper.README(repo_api = api),
            'languages': Github.getAPI(api['languages_url']),
            'events': Github.getAPIList(api['events_url']),
            'releases': Github.getAPIList(str(api['releases_url']).format(**{'/id':''}))
        })

    index['pages']['projects'][stem] = Gen('pages','projects',stem).ref_json(project)


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
    'followers_url': Gen('github','user','followers').ref_json(Github.getAPIList(user_api['followers_url'],count=1000))
}
index['github']['user'] = Gen('github','user').ref_json(user)


# Markdown Snippets
for snippet_path in conf.getFiles('markdown'):
    snippet = frontmatter.load(conf.getPath(*snippet_path)).to_dict()
    stem = Path(snippet_path[-1]).stem
    index['snippets'][stem] = Gen('markdown',stem).ref_json(Github.renderMarkdown(snippet['content']))

# Announcements
index['announcements'] = Gen('announcements').ref_json(conf.getJSON('announcements.json'))

index['analytics'] = Gen('analytics').ref_json({
    'github': {
        'api': Github.getAnalytics(),
        'cache': Github.getAPI('https://api.github.com/repos/LittleTealeaf/littletealeaf.github.io/actions/cache/usage',expires=-1,expires_step=0),
        'rate_limits': Github.getAPI('https://api.github.com/rate_limit',expires=-1,expires_step=0)
    }
})

Gen('index').ref_json(index)
