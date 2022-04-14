# This script is simply to post-render the out script

import os
import bs4



PATH = os.path.join('.','out')

def get_size():
    size = 0
    for dir,_,files in os.walk(PATH):
        for file in files:
            size += os.path.getsize(os.path.join(dir,file))
    return size

print(f'Initial Size: {get_size()} B')

for dir,_,files in os.walk(PATH):
    for file in files:
        if file.endswith('.html'):
            initialSize = os.path.getsize(os.path.join(dir,file))
            contents = None
            with open(os.path.join(dir,file),encoding='utf-8') as f:
                contents = f.read()
            soup = bs4.BeautifulSoup(contents,'html.parser')
            for comments in soup.findAll(text=lambda text: isinstance(text,bs4.Comment)):
                comments.extract()
            with open(os.path.join(dir,file),'w',encoding='utf-8') as f:
                f.write(str(soup))
            print(f'Compressed {file}: \n\t{initialSize} B -> {os.path.getsize(os.path.join(dir,file))} B')


print(f'Final Size: {get_size()} B')
