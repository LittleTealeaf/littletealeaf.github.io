import os


def load_template(path):
    with open(path) as f:
        return "".join(f.readlines())

def load_templates():
    templates = {}
    for template in os.listdir('./templates/'):
        if not os.path.isdir(f'./templates/{template}'):
            templates[template.partition('.')[0]] = load_template(f'./templates/{template}')
    return templates