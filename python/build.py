from pathlib import Path
import libs.github as Github
import libs.githubwrapper as GithubWrapper
from libs.generated import Gen, gen_initialize
import libs.config as conf
import libs.images as images
import frontmatter

import json



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
            'readme': GithubWrapper.README(project['github']['repo']),
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


# Markdown Snippets
for snippet_path in conf.getFiles('markdown'):
    snippet = frontmatter.load(conf.getPath(*snippet_path)).to_dict()
    stem = Path(snippet_path[-1]).stem
    index['snippets'][stem] = Gen('markdown',stem).ref_json(Github.renderMarkdown(snippet['content']))

# Announcements
index['announcements'] = Gen('announcements').ref_json(conf.getJSON('announcements.json'))

user_api = Github.getAPI('https://api.github.com/user')

index['github'] = {
    'user': Gen('github','user','api').ref_json(user_api),
    'repositories': Gen('github','user','repositories').ref_json(Github.getAPIList(user_api['repos_url'])),
    'events': Gen('github','user','events').ref_json(Github.getAPIList(str(user_api['events_url']).format(**{'/privacy':''}))),
    'followers': Gen('github','user','followers').ref_json(Github.getAPIList(str(user_api['followers_url']))),
    'following': Gen('github','user','following').ref_json(Github.getAPIList(str(user_api['following_url']).format(**{'/other_user':''}))),
    'starred': Gen('github','user','starred').ref_json(Github.getAPIList(str(user_api['starred_url']).format(**{'/owner':'','/repo':''}))),
    'gists': Gen('github','user','gists').ref_json(Github.getAPIList(str(user_api['gists_url']).format(**{'/gist_id':''}))),
    'organizations': Gen('github','user','organizations').ref_json(Github.getAPIList(str(user_api['organizations_url'])))
}


analytics = {
    'github': {
        'api': Github.getAnalytics(),
        'cache': Github.getAPI('https://api.github.com/repos/LittleTealeaf/littletealeaf.github.io/actions/cache/usage',expires=-1,expires_step=0),
        'rate_limits': Github.getAPI('https://api.github.com/rate_limit',expires=-1,expires_step=0)
    }
}
index['snippets']['analytics'] = Gen('markdown','analytics').ref_json(Github.renderMarkdown(f'```json\n{json.dumps(analytics,indent=4,sort_keys=True)}\n```'))

Gen('index').ref_json(index)
