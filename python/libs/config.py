import os
import json


def getPath(*path):
    return os.path.join('.', 'config', *path)


def getJSON(*path):
    data = {}
    with open(getPath(*path)) as file:
        data = json.load(file)
    return data


def getFiles(*path):
    return [list(path) + [i] for i in os.listdir(getPath(*path))]
