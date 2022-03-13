import os, json, shutil

def dir_gen_src():
    return os.path.join('.','src','gen')

def dir_gen_public():
    return os.path.join('.','public','gen')

def delete_directory_if_exists(dir):
    if os.path.exists(dir) and os.path.isdir(dir):
        shutil.rmtree(dir)

delete_directory_if_exists(dir_gen_public())
delete_directory_if_exists(dir_gen_src())