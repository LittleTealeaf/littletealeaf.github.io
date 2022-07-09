

import json
import os
import shutil


def getJson(name):
    with open(os.path.join("resources","json",f"{name}.json")) as f:
        return json.load(f)

def referenceImage(name):
    if not os.path.exists(os.path.join("pages","generated","images")):
        os.mkdir(os.path.join("pages","generated","images"))
    shutil.copyfile(os.path.join("resources","images",name),os.path.join("pages","generated","images",name))
    return "/".join(["generated","images",name])
