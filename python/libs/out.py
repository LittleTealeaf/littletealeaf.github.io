import os
import json
from PIL import Image
import shutil

DIR_NAME = 'resources'

GENERATED_DIRECTORY = os.path.join('.', DIR_NAME)


def gen_initialize():
    shutil.rmtree(GENERATED_DIRECTORY, ignore_errors=True)


def refjson(object, *path):
    ref = '/'.join(path)
    filepath = os.path.join(GENERATED_DIRECTORY, *path)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w') as file:
        file.write(json.dumps(object, separators=(',', ':')))
    return ref


class Gen:
    def __init__(self, *path):
        self.path = os.path.join('.', DIR_NAME, *path)
        self.ref = '/'.join(path)
        os.makedirs(os.path.dirname(self.path), exist_ok=True)

    def ref_json(self, object):
        if not self.path.endswith('.json'):
            self.path = self.path + '.json'
            self.ref = self.ref + '.json'
        with open(self.path, 'w') as file:
            file.write(json.dumps(object, separators=(',', ':')))
        return self.ref

    def ref_image(self,img: Image.Image):
        if not self.path.endswith('.png'):
            self.path = self.path + '.png'
            self.ref = self.ref + '.png'
        img.save(self.path)
        return self.ref

    def ref_file(self,filepath):
        shutil.copyfile(filepath,self.path)
        return self.ref
