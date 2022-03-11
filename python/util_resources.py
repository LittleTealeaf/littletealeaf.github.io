import os, random


def res_gen_new(seed,extension,length=10):
    random.seed(str(seed))
    letters = ['abcdefghijklmnopqrstuvwxyz1234567890']
    name = "".join([letters[random.randint(0,len(letters))] for i in range(length)]) 
    return f'./resources/gen/{name}.{extension}'

def res_gen_ref(path):
    "Converts a generated file's path to one that can be used in scripts"
    return path.replace("./resources","/resources")
