import json

def get_res(*path: str) -> str:
    return '/'.join(['.','resources',*path])

def get_json_res(*path: str) -> str:
    with open(get_res(*path)) as file:
        return json.load(file)
