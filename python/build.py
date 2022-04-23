import os
import libs.github as Github
import libs.githubwrapper as GithubWrapper
from libs.out import Gen, gen_initialize
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

for project_path in conf.getFiles('projects'):
    endpoint = project_path[-1]

    def fileExists(name): return os.path.exists(
        conf.getPath(*(project_path + [name])))
    project = conf.getJSON(*(project_path + ['index.json']))

    if 'repos' in project:
        for repo in project['repos']:
            api = Github.getAPI(f'https://api.github.com/repos/{repo}')
            project['repos'][repo].update({
                'api': api,
                'contributors': Github.getAPIList(api['contributors_url']),
                'readme': GithubWrapper.README(api['full_name']),
                'events': Github.getAPIList(api['events_url']),
                'languages': Github.getAPI(api['languages_url'])
            })
            project['repos'][repo] = Gen('projects', endpoint, 'repos', api['node_id']).ref_json(project['repos'][repo])

    if fileExists('about.md'):
        project['about'] = Markdown.buildFile(
            conf.getPath(*(project_path + ['about.md'])), **{
                'link_src': f'https://raw.githubusercontent.com/LittleTealeaf/littletealeaf.github.io/main/config/projects/{endpoint}/',
                'link_href': f'https://github.com/LittleTealeaf/littletealeaf.github.io/tree/main/config/projects/{endpoint}/'
            })
    Index.set(['projects', endpoint], Gen(
        'projects', endpoint, 'index').ref_json(project))

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

# Copy over all the asset files
path = conf.getPath('assets')
def iterateAssets(filepath,path):
    for file in os.listdir(filepath):
        fullpath = os.path.join(filepath,file)
        if os.path.isdir(fullpath):
            iterateAssets(fullpath,path + [file])
        else:
            Index.set(path + [file.replace('.','_')],Gen(*(path + [file])).ref_file(fullpath))

iterateAssets(conf.getPath('assets'),['assets'])

Index.export()
