import os

def read_file(file):
    with open(file) as f:
        return "".join(f.readlines())

def load_templates():
    templates = {}
    for template in os.listdir('./templates/'):
        if not os.path.isdir(f'./templates/{template}'):
            templates[template.partition('.')[0]] = read_file(f'./templates/{template}')
    return templates