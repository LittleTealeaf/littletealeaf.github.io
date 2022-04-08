import libs.github as Github
import libs.images as Images
from libs.generated import Gen
import urllib3


def repo(url):
    api = Github.getAPI(url)

    events = []
    for api in Github.getAPIList(api['events_url'],count=500):
        return {
            'api': api,
            'actor_avatar': Gen('github','events',api['actor']['login']).ref_image(Images.get(api['actor']['avatar_url'],circular=True)) if 'actor' in api else ''
        }

    contents = Github.getAPI(str(api['contents_url']).replace('{+path}',''))
    readme = None
    for file in contents:
        if str(file['name']).lower() == 'readme.md':
            with urllib3.PoolManager().request('GET',file['download_url'],preload_content=False) as r:
                readme = '\n'.join([line.decode('utf-8') for line in r]).replace('\r\n\n','\n')


    return {
        'api': api,
        'languages': Github.getAPI(api['languages_url']),
        'events': events,
        'releases': Github.getAPIList(str(api['releases_url']).replace('{/id}','')),
        'contents': contents,
        'readme': readme
    }
