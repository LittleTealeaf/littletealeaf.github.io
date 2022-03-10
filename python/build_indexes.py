import os

from template_tools import *



# The goal of this script is to create the index in each sub-directory by formatting the templates provided
print('build_indexes.py')

# Build templates into dictionary
templates = load_templates()

# For each directory with a template.html
for dir in map(lambda dirinfo: dirinfo[0], filter(lambda dirinfo: 'template.html' in dirinfo[2], os.walk('.'))):
    
    # Build templates
    print(f'Building {dir}')
    template = read_file(os.path.join(dir,'template.html'))
    with open(os.path.join(dir,'index.html'),'w') as file:
        file.write(template.format(**templates))
    