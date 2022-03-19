import os
from assetutil import *
from githubutil import *
from jsonutil import *
from imageutil import *

clean_directory()

CONFIG = load_json(get_asset_path('pyconfig.json'))

index = {}


user = api_github(f'https://api.github.com/users/{CONFIG["username"]}')

index['user'] = ref_github_user(api=user,followers=True,following=True)

# Repositories
repos = filter(lambda item: not item['private'], api_github_list(user['repos_url'],count=CONFIG['load_count']['repositories']))
index['repositories'] = ref_json([ref_github_repository(i['url']) for i in repos])

# Projects
with open(get_asset_path('projects.json')) as file:
    projects = []
    for project in json.load(file):
        project['repository'] = ref_github_repository(project['repository'],get_events=True,get_contributors=True,get_stargazers=True)
        project['attributes'] = ref_json(project['attributes'])
        projects.append(ref_json(project))
    
    index['projects'] = ref_json(projects)


#Resume
with open(get_asset_path('resume.json')) as file:
    r = json.load(file)

    for category in r['skills']:
        r['skills'][category] = ref_json([{'name': key, 'attributes': r['skills'][category][key]} for key in r['skills'][category]])
    
    r['skills'] = ref_json([{'name':key, 'values': r['skills'][key]} for key in r['skills']])
    
    index['resume'] = ref_json(r)



save_json(index,Asset(name='index.json'))


with open('tmp.json') as file:
    data = json.load(file)
    print(f'Pinged API a total of {data["count"]} times')

os.remove('tmp.json')