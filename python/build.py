from github import *
from export import *
from res import *

clear_export()

export_image('./resources/images/backgrounds/home.jpg','images','backgrounds','home.webp')


# Projects
project_list = get_json_res('json','projects.json')
for project in project_list:
    if 'image' in project:
        project['image'] = export_image(get_res('images','projects',project['image']),'images','projects',f'{project["name"]}.webp')
export_json(project_list,'data','projects.json')
