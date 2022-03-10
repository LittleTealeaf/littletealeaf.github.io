import os

from template_tools import *

# The goal of this script is to create the index in each sub-directory by formatting the templates provided


header = load_template('./templates/header.html')
footer = load_template('./templates/footer.html')

# For each directory with a template.html
for dir in map(lambda dirinfo: dirinfo[0], filter(lambda dirinfo: 'template.html' in dirinfo[2], os.walk('.'))):
    print(f'Building {dir}')
    template = load_template(os.path.join(dir,'template.html'))
    with open(os.path.join(dir,'index.html'),'w') as file:
        file.write(template.format(
            header = header,
            footer = footer
        ))
    