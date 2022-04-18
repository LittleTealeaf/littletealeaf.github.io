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
            'releases': Github.getAPIList(str(api['releases_url']).format(**{'/id':''})),
            'contributors': Github.getAPIList(str(api['contributors_url'])),
            'tags': Github.getAPIList(str(api['tags_url']))
        })
    Index.set(['pages','projects',stem],Gen('pages','projects',stem).ref_json(project))

user_api = Github.getAPI('https://api.github.com/user')

Index.set(['github'],{
    'user': Gen('github','user','api').ref_json(user_api),
    'repositories': Gen('github','user','repositories').ref_json(Github.getAPIList(user_api['repos_url'])),
    'events': Gen('github','user','events').ref_json(Github.getAPIList(str(user_api['events_url']).format(**{'/privacy':''}))),
    'followers': Gen('github','user','followers').ref_json(Github.getAPIList(str(user_api['followers_url']))),
    'following': Gen('github','user','following').ref_json(Github.getAPIList(str(user_api['following_url']).format(**{'/other_user':''}))),
    'starred': Gen('github','user','starred').ref_json(Github.getAPIList(str(user_api['starred_url']).format(**{'/owner':'','/repo':''}))),
    'gists': Gen('github','user','gists').ref_json(Github.getAPIList(str(user_api['gists_url']).format(**{'/gist_id':''}))),
    'organizations': Gen('github','user','organizations').ref_json(Github.getAPIList(str(user_api['organizations_url']))),
    'readme': Gen('github','user','readme').ref_json(GithubWrapper.README(f"{user_api['login']}/{user_api['login']}"))
})

Markdown.renderDirectory()

analytics = {
    'github': {
        'cache': Github.getAPI('https://api.github.com/repos/LittleTealeaf/littletealeaf.github.io/actions/cache/usage',use_cache=False),
        'rate_limits': Github.getAPI('https://api.github.com/rate_limit',use_cache=False)
    }
}

Index.set(['markdown','debug','cache'],Gen('markdown','debug','cache').ref_json(Markdown.buildHash(f'```json\n{json.dumps(Cache.reportCaches(),indent=4,sort_keys=True)}\n```')))

Index.set(['markdown','debug','analytics'],Gen('markdown','debug','analytics').ref_json(Markdown.buildHash(f'```json\n{json.dumps(analytics,indent=4,sort_keys=True)}\n```')))


Index.export()
