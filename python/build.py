import os
from pathlib import Path
import libs.github as Github
import libs.githubwrapper as GithubWrapper
from libs.generated import Gen, gen_initialize
import libs.temp as Temp
import libs.markdown as Markdown
import libs.config as conf
import libs.images as images
import libs.index as Index
import libs.cache as Cache
import frontmatter

import json

Temp.clean()
gen_initialize()


# for project_path in conf.getFiles('projects'):
#     project = conf.getJSON(*project_path)
#     stem = Path(project_path[-1]).stem

#     if project['github'] != None:
#         def compileRepo(repoConfig):
#             api = Github.getAPI(f'https://api.github.com/repos/{repoConfig["repo"]}')
#             return {
#                 'api': api,
#                 'readme': GithubWrapper.README(repoConfig['repo']),
#                 'languages': Github.getAPI(api['languages_url']),
#                 'events': Github.getAPIList(api['events_url']),
#                 'releases': Github.getAPIList(str(api['releases_url']).format(**{'/id':''})),
#                 'contributors': Github.getAPIList(str(api['contributors_url'])),
#                 'tags': Github.getAPIList(str(api['tags_url']))
#             }
#         project['github'] = [compileRepo(item) for item in project['github']]
#     Index.set(['pages','projects',stem],Gen('pages','projects',stem).ref_json(project))

for project_path in conf.getFiles('projects'):
    endpoint = project_path[-1]

    def fileExists(name): return os.path.exists(
        conf.getPath(*(project_path + [name])))
    project = {}

    if fileExists('index.json'):
        project['index'] = conf.getJSON(*(project_path + ['index.json']))

    if fileExists('post.md'):
        project['post'] = Markdown.buildFile(
            conf.getPath(*(project_path + ['post.md'])),**{
                'link_src': f'https://raw.githubusercontent.com/LittleTealeaf/littletealeaf.github.io/main/config/projects/{endpoint}/',
                'link_href': f'https://github.com/LittleTealeaf/littletealeaf.github.io/tree/main/config/projects/{endpoint}/'
            })
    if fileExists('repos.json'):
        repos = conf.getJSON(*(project_path + ['repos.json']))
        project['repos'] = {}
        for group in repos['github']:
            if group not in project['repos']:
                project['repos'][group] = []
            for repo in repos['github'][group]:
                api = Github.getAPI(f'https://api.github.com/repos/{repo["repo"]}')
                project['repos'][group].append({
                    'name': api['name'],
                    'full_name': repo['repo'],
                    'readme': GithubWrapper.README(repo['repo']),
                    'owner': api['owner'],
                    'languages': Github.getAPI(api['languages_url']),
                    'contributors': Github.getAPIList(str(api['contributors_url']))
                })
    Index.set(['projects', endpoint], Gen(
        'projects', endpoint).ref_json(project))

user_api = Github.getAPI('https://api.github.com/user')

Index.set(['github'], {
    'user': Gen('github', 'user', 'api').ref_json(user_api),
    'repositories': Gen('github', 'user', 'repositories').ref_json(Github.getAPIList(user_api['repos_url'])),
    'events': Gen('github', 'user', 'events').ref_json(Github.getAPIList(str(user_api['events_url']).format(**{'/privacy': ''}))),
    'followers': Gen('github', 'user', 'followers').ref_json(Github.getAPIList(str(user_api['followers_url']))),
    'following': Gen('github', 'user', 'following').ref_json(Github.getAPIList(str(user_api['following_url']).format(**{'/other_user': ''}))),
    'starred': Gen('github', 'user', 'starred').ref_json(Github.getAPIList(str(user_api['starred_url']).format(**{'/owner': '', '/repo': ''}))),
    'gists': Gen('github', 'user', 'gists').ref_json(Github.getAPIList(str(user_api['gists_url']).format(**{'/gist_id': ''}))),
    'organizations': Gen('github', 'user', 'organizations').ref_json(Github.getAPIList(str(user_api['organizations_url']))),
    'readme': Gen('github', 'user', 'readme').ref_json(GithubWrapper.README(f"{user_api['login']}/{user_api['login']}"))
})

Markdown.renderDirectory()

analytics = {
    'build': Temp.get('analytics'),
    'github': {
        'cache': Github.getAPI('https://api.github.com/repos/LittleTealeaf/littletealeaf.github.io/actions/cache/usage', use_cache=False),
        'rate_limits': Github.getAPI('https://api.github.com/rate_limit', use_cache=False)
    }
}

Index.set(['markdown', 'debug', 'cache'], Gen('markdown', 'debug',
          'cache').ref_json(Markdown.renderPrintJSON(Cache.reportCaches())))

Index.set(['markdown', 'debug', 'analytics'], Gen('markdown', 'debug',
          'analytics').ref_json(Markdown.renderPrintJSON(analytics)))


Index.export()
