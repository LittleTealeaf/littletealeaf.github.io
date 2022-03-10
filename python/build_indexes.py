import os

from template_tools import *

# The goal of this script is to create the index in each sub-directory by formatting the templates provided


# Build templates into dictionary
templates = {}
for template in os.listdir('./templates/'):
    if not os.path.isdir(f'./templates/{template}'):
        templates[template.partition('.')[0]] = load_template(f'./templates/{template}')


# For each directory with a template.html
for dir in map(lambda dirinfo: dirinfo[0], filter(lambda dirinfo: 'template.html' in dirinfo[2], os.walk('.'))):
    
    # Build templates
    print(f'Building {dir}')
    template = load_template(os.path.join(dir,'template.html'))
    with open(os.path.join(dir,'index.html'),'w') as file:
        file.write(template.format(**templates))
    