# This is a temporary file that will eventually be turned into an "index" library instead of just doing it all in build.py
# However, this requires that a temporary location be made
import libs.temp as Temp
from libs.generated import Gen

def set(path: list,value):
    path = path.copy()
    dictionary = load()
    pointer = dictionary
    while len(path) > 1:
        if path[0] not in pointer:
            pointer[path[0]] = {}
        pointer = pointer[path[0]]
        path = path[1:]
    pointer[path[0]] = value
    Temp.store('index',dictionary)


def export():
    Gen('index').ref_json(Temp.get('index'))

# def dict_set_value(dictionary,path,value):
#     if len(path) > 1:
#         dictionary[path[0]] = {}
#         dict_set_value(dictionary[path[0]],path[1:],value)
#     else:
#         dictionary[path[0]] = value
#     return dictionary

def load():
    try:
        return Temp.get('index')
    except:
        return {}
