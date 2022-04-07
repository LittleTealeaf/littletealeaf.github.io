import os
import shutil
import libs.cachelib as cache


def kB(size):
    return size * 1000


def MB(size):
    return 1000 * kB(size)


def GB(size):
    return 1000 * MB(size)


def cleanDir(directory, max_bytes=GB(1)):
    size = 0
    for dir, dirs, files in os.walk(directory):
        for f in files:
            fp = os.path.join(dir, f)
            size += os.path.getsize(fp)
    print(directory, size, max_bytes)
    if size > max_bytes or ('RUN_NUMBER' in os.environ and int(os.environ['RUN_NUMBER']) % 100 == 0):
        shutil.rmtree(directory)
        os.makedirs(directory, exist_ok=True)


cache.clean()

cleanDir(os.path.join('.', 'cache'), GB(2))
cleanDir(os.path.join('.', '.next', 'cache'))
cleanDir(os.path.join('.', 'node_modules'))
