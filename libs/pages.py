from libs.export import *

COUNT = 0

def page(name: str, data, renderer = 'default'):
  global COUNT

  path = export_json(['pages',str(COUNT)],data)

  COUNT = COUNT + 1

  return {'name': name, 'contents': path, 'type': 'page', 'renderer': renderer}

def folder(name: str, contents: dict):
  return {
    'name': name,
    'type': 'folder',
    'contents': contents
  }


def export_tree(tree: dict):
  export_json(['pages','index'],tree)
