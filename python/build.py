import util_assets as assets
import util_json as json
import util_analytics as analytics
import util_images as images
import util_github as github
import util_temp as temp
import util_cache as cache
from util_assets import Asset
from util_config import config, get_config_file

assets.initialize()
temp.initialize()
cache.clean()

# god, help me

index = {}

index['user'] = github.ref_user(obj=github.api('https://api.github.com/user'),conf={
    'followers': {
        'include': True
    },
    'following': {
        'include': True
    },
    'events': {
        'include': True
    },
    'starred': {
        'include': True
    }
})

index['website_repository'] = github.ref_repository(url=config('github','repository_api'), conf={
    'force_api': True,
    'contributors': {
        'count': 100,
        'include': True
    },
    'stargazers': {
        'include': True
    },
    'subscribers': {
        'include': True
    },
    'events': {
        'include': True
    }
})

repos = filter(lambda item: not item['private'],github.api_list('https://api.github.com/user/repos',count=config('github','repositories','count')))
index['repositories'] = json.ref([github.ref_repository(obj=i) for i in repos])

## Projects
projects = []
for project in json.load(path=config('config','projects','path')):
    project['repository'] = github.ref_repository(url=project['repository'],conf={
        'contributors': {
            'include': True
        },
        'stargazers': {
            'include': True
        }
    })
    project['attributes'] = json.ref(project['attributes'])
    projects.append(json.ref(project))
index['projects'] = json.ref(projects)

## Resume
resume = json.load(path=config('config','resume','path'))
for category in resume['skills']:
    resume['skills'][category] = json.ref([{'name':key,'attributes': resume['skills'][category][key]} for key in resume['skills'][category]])
resume['skills'] = json.ref([{'name':key, 'values': resume['skills'][key]} for key in resume['skills']])
index['resume'] = json.ref(resume)

index['analytics'] = analytics.ref()


# emojis = github.api('https://api.github.com/emojis')
# index['emojis'] = json.ref([{'name': key, 'url': emojis[key]} for key in emojis])

index['emojis'] = github.ref_api('https://api.github.com/emojis');

config_includes = config('output','include_config')
for key in config_includes:
    index[key] = json.ref(get_config_file(config_includes[key]))



json.save(index,Asset(name=config('output','index_name')))



print(f'{github.get_remaining_api_requests()} requests remaining')