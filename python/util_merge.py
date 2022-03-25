

MERGE = 'merge'

def update(a: any, b: any) -> any:
    if isinstance(a,dict) and isinstance(b,dict):
        return dicts(a,b)
    elif isinstance(a,list) and isinstance(b,list):
        return lists(a,b)
    else:
        return b

def dicts(a: dict, b: dict) -> dict:
    res = a.copy()
    for key in b:
        if key in a:
            res[key] = update(a[key],b[key])
            # if isinstance(a[key],dict) and isinstance(b[key],dict):
            #     res[key] = dicts(a[key],b[key])
            # elif isinstance(a[key],list) and isinstance(b[key],list):
            #     res[key] = lists(a[key],b[key])
            # else:
            #     res[key] = b[key]
        else:
            res[key] = b[key]
    return res

def lists(a: list, b: list) -> list:
    res = a.copy()
    for item in b:
        if item not in res:
            res.append(item)
    return res

def merge(a,b):
    if isinstance(a,dict) and isinstance(b,dict):
        ret = a.copy()
        for key in b:
            ret[key] = merge(ret[key],b[key])
        return ret
    elif isinstance(a,list) and isinstance(b,list):
        return b
    elif isinstance(a,list) and isinstance(b,dict) and 'merge_type' in b:
        if b['merge_type'] == MERGE:
            ret = a.copy()
            for item in b['values']:
                if item not in ret:
                    ret.append(item)
            return ret
    else:
        return b
