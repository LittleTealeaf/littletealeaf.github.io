from assetutil import *
from githubutil import *
from jsonutil import *
from imageutil import *
from config import *

clean_directory()

index = {}

index['user'] = ref_github_user(username='LittleTealeaf',followers=True,following=True)

with open(os.path.join('.','assets','projects.json')) as file:
    projects = json.load(file)
    for project in projects:
        project['repository'] = ref_github_repository(project['repository'])
        project['attributes'] = ref_json(project['attributes'])
    
    index['projects'] = ref_json([ref_json(i) for i in projects])

save_json(index,Asset(name='index.json'))