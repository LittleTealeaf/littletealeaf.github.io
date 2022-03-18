from assetutil import *
from githubutil import *
from jsonutil import *
from imageutil import *
from config import *

clean_directory()

index = {}

index['user'] = ref_github_user(username='LittleTealeaf',followers=True,following=True)


#Projects
with open(os.path.join('.','assets','templates','projects.json')) as file:
    projects = json.load(file)
    for project in projects:
        project['repository'] = ref_github_repository(project['repository'])
        project['attributes'] = ref_json(project['attributes'])
    
    index['projects'] = ref_json([ref_json(i) for i in projects])


#Resume
with open(os.path.join('.','assets','templates','resume.json')) as file:
    r = json.load(file)

    for category in r['skills']:
        r['skills'][category] = ref_json([{'name': key, 'attributes': r['skills'][category][key]} for key in r['skills'][category]])
    
    r['skills'] = ref_json([{'name':key, 'values': r['skills'][key]} for key in r['skills']])
    
    index['resume'] = ref_json(r)

save_json(index,Asset(name='index.json'))