import shutil
from PIL import Image
import os
import json


def export_image(url,*path):
    img = Image.open(url)
    reference,absolute = export_path(*path)

    make_directory(absolute)
    img.save(absolute)
    return reference

def export_json(object,*path):
    reference,absolute = export_path(*path)
    make_directory(absolute)
    with open(absolute,'w') as file:
        file.write(json.dumps(object))
    return reference




def make_directory(path):
    dir_path = os.path.dirname(path)
    if not os.path.exists(dir_path):
        os.makedirs(dir_path,exist_ok=True)


def export_path(*path):
    """
    Returns the absolute path, reference path
    """
    return ("/".join(['resources', *path]), "/".join([".", "pages", 'resources', *path]))

def clear_export():
    try:
        shutil.rmtree(os.path.join('.','pages','resources'))
    except:
        ...
