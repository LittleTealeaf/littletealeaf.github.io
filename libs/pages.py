from re import I
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


def page(name: str, content, render="dom", children=None, id=None):
    global COUNT
    path = export_json(["pages", str(COUNT)], content)
    COUNT = COUNT + 1

    node = {"name": name, "src": path, "render": render}

    if children:
      node['children'] = children

    if id:
      node['id'] = id

    return node


def export_tree(tree: dict):
    export_json(["index"], tree)


def format_dom(dom):

  if type(dom) == str:
    if dom.startswith("[IMG]"):
      return export_any_image(dom.replace("[IMG]",""))

    return dom

  if type(dom) == dict:
    for key in dom:
      dom[key] = format_dom(dom[key])

  if type(dom) == list:
    for i in range(len(dom)):
      dom[i] = format_dom(dom[i])


  return dom


  # for key in dom:
  #   value = dom[key]
  #   if type(value) == str:
  #     if value.startswith("[IMG]"):
  #       value = value.replace("[IMG]","")
  #       dom[key] = export_any_image(value)
