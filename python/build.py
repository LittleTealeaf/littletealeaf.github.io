from multiprocessing.spawn import old_main_modules
import os, json
from util_resources import *

def write_file(path,content):
    dir = os.path.split(path)[0]
    if not os.path.exists(dir):
        os.makedirs(dir)
    with open(path,'w') as f:
        f.write(content)

def join_templates(*templates):
    joined = {}
    for template in templates:
        for value in template:
            joined[value] = template[value]
    return joined

templates = {}
for root,dirs,files in os.walk('./templates'):
    path = root.replace('./templates','')
    for file in files:
        with open(os.path.join(root,file)) as f:
            templates[os.path.join(path,file.partition('.')[0])] = "".join(f.readlines())

for root, dirs, files in os.walk('./source'):
    if 'index.html' in files:
        path = root.replace('./source','./build')
        with open(os.path.join(root,'index.html')) as f:
            line = "".join(f.readlines())
            write_file(os.path.join(path,'index.html'),line.format(**templates))

