
import json
import os
import shutil


def getJson(name):
    with open(os.path.join("resources","json",name)) as f:
        return json.load(f)

def referenceImage(name,savename=None):
    if not os.path.exists(os.path.join("pages","generated","images")):
        os.mkdir(os.path.join("pages","generated","images"))

    if not savename:
        savename = name

    shutil.copyfile(os.path.join("resources","images",name),os.path.join("pages","generated","images",savename))
    return "/".join(["generated","images",savename])
