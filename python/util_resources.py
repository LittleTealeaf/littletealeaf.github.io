import os, random


def res_gen_name(seed,extension,length=10):
    random.seed(str(seed))
    letters = ['abcdefghijklmnopqrstuvwxyz1234567890']
    name = "".join([letters[random.randint(0,len(letters))] for i in range(length)]) 
    return f'./resources/generated/{name}.{extension}'

