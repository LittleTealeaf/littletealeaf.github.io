import os, shutil

dir_gen_src = os.path.join('.','src','gen')
dir_gen_public = os.path.join('.','public','gen')


def delete_directory_if_exists(dir):
    if os.path.exists(dir) and os.path.isdir(dir):
        shutil.rmtree(dir)

delete_directory_if_exists(dir_gen_public)
delete_directory_if_exists(dir_gen_src)