import os

def load_templates():
    templates = {}
    for template in os.listdir('./templates/'):
        if not os.path.isdir(f'./templates/{template}'):
            with open(f'./templates/{template}') as f:
                templates[template.partition('.')[0]] = "".join(f.readlines())
    return templates