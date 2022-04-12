# This script is simply to post-render the out script

import os
import bs4
import htmlmin



PATH = os.path.join('.','out')

def get_size():
    size = 0
    for dir,_,files in os.walk(PATH):
        for file in files:
            size += os.path.getsize(os.path.join(dir,file))
    return size

print(f'Start Out Size: {get_size()}')

for dir,_,files in os.walk(PATH):
    for file in files:
        if file.endswith('.html'):
            contents = None
            with open(os.path.join(dir,file),encoding='utf-8') as f:
                contents = f.read()
            soup = bs4.BeautifulSoup(contents,'html.parser')
            for comments in soup.findAll(text=lambda text: isinstance(text,bs4.Comment)):
                comments.extract()
            with open(os.path.join(dir,file),'w',encoding='utf-8') as f:
                f.write(htmlmin.minify(str(soup)))

print(f'Final Out Size: {get_size()}')
