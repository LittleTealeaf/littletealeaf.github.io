import libs.temp as Temp
from libs.out import Gen

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

def load():
    tmp = Temp.get('index')
    if tmp == None:
        return {}
    else:
        return tmp
