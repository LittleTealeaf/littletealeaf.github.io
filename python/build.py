from github import *
from export import *
from res import *
from pathlib import Path

clear_export()

# export_image('./resources/images/backgrounds/home.jpg','images','backgrounds','home.webp')

getGithubApi('/users/LittleTealeaf')


for file in os.listdir(get_res('images','background')):

    name = Path(file).stem
    export_image(get_res('images','background',file),'images','background',f'{name}.webp')


# Projects
project_list = get_json_res('json','projects.json')
for project in project_list:
    if 'image' in project:
        project['image'] = export_image(get_res('images','projects',project['image']),'images','projects',f'{project["name"]}.webp')
export_json(project_list,'data','projects.json')
