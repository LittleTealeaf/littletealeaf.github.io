
def dicts(a: dict, b: dict) -> dict:
    res = a.copy()
    for key in b:
        if key in a:
            if isinstance(a[key],dict) and isinstance(b[key],dict):
                res[key] = dicts(a[key],b[key])
            elif isinstance(a[key],list) and isinstance(b[key],list):
                res[key] = lists(a[key],b[key])
            else:
                res[key] = b[key]
        else:
            res[key] = b[key]
    return res

def lists(a: list, b: list) -> list:
    res = a.copy()
    for item in b:
        if item not in res:
            res.append(item)
    return res