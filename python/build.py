from site import getuserbase
import util_assets as assets
import util_json as json
import util_analytics as analytics
import util_images as images
import util_github as github
from util_assets import Asset
from util_config import CONFIG

assets.initialize()
analytics.clear()

index = {}

index['user'] = github.ref_user(username=CONFIG['username'],followers=True,following=True)
user = json.load(path=f"./assets/generated/{index['user']}")

repos = filter(lambda item: not item['private'],github.api_list(user['repos_url'],count=CONFIG['load_count']['repositories']))
index['repositories'] = json.ref([github.ref_repository(obj=i,get_contributors=True) for i in repos])

## Projects
projects = []
for project in json.load(path=assets.config_path('projects.json')):
    project['repository'] = github.ref_repository(url=project['repository'],get_events=True,get_contributors=True,get_stargazers=True,get_subscribers=True)
    project['attributes'] = json.ref(project['attributes'])
    projects.append(json.ref(project))
index['projects'] = json.ref(projects)

## Resume
resume = json.load(path=assets.config_path('resume.json'))
for category in resume['skills']:
    resume['skills'][category] = json.ref([{'name':key,'attributes': resume['skills'][category][key]} for key in resume['skills'][category]])
resume['skills'] = json.ref([{'name':key, 'values': resume['skills'][key]} for key in resume['skills']])
index['resume'] = json.ref(resume)

index['analytics'] = analytics.ref()


json.save(index,Asset(name='index.json'))

print(f'{github.api_requests_remaining()} requests remaining')