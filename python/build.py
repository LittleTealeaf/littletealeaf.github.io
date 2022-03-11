import os, json
from re import template

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