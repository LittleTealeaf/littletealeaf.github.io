from libs.export import *

COUNT = 0

# def page(name: str, data, renderer = 'dom'):
#   global COUNT

#   path = export_json(['pages',str(COUNT)],data)

#   COUNT = COUNT + 1

#   return {'name': name, 'source': path, 'type': 'page', 'renderer': renderer}

# def folder(name: str, contents: dict):
#   return {
#     'name': name,
#     'type': 'folder',
#     'contents': contents
#   }


def page(name: str, content, render="dom", children=None):
    global COUNT
    path = export_json(["pages", str(COUNT)], content)
    COUNT = COUNT + 1

    node = {"name": name, "src": path, "render": render}

    if children:
      node['children'] = children

    return node


def export_tree(tree: dict):
    export_json(["index"], tree)
