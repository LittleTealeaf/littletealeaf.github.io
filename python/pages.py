from distutils.sysconfig import customize_compiler
from python.export import *

COUNT = 0

def page(name: str, data, renderer = 'default'):
  global COUNT

  path = export_json(['pages',str(COUNT)],{
    'renderer': renderer,
    'data': data
  })

  COUNT = COUNT + 1

  return {'name': name, 'link': path, 'type': 'page'}

def folder(name: str, contents: dict):
  return {
    'name': name,
    'type': 'folder',
    'contents': contents
  }


def export_tree(tree: dict):
  export_json(['pages','index'],tree)
