import os
import shutil
import libs.cachelib as cache

BUILD_CACHE_PARTIAL = 50
BUILD_CACHE_FULL = 500

def is_interval(interval):
    return ('RUN_NUMBER' in os.environ and interval != -1 and int(os.environ['RUN_NUMBER']) % interval == 0)

cache.clean(partial_wipe=is_interval(BUILD_CACHE_PARTIAL), full_wipe=is_interval(BUILD_CACHE_FULL))

# def kB(size):
#     return size * 1000


# def MB(size):
#     return 1000 * kB(size)


# def GB(size):
#     return 1000 * MB(size)


# def cleanDir(directory, max_bytes=GB(1), expire_interval=100):
#     size = 0
#     for dir, _, files in os.walk(directory):
#         for f in files:
#             fp = os.path.join(dir, f)
#             size += os.path.getsize(fp)
#     print(directory, size, max_bytes)
#     if size > max_bytes or ('RUN_NUMBER' in os.environ and expire_interval != -1 and int(os.environ['RUN_NUMBER']) % expire_interval == 0):
#         shutil.rmtree(directory)
#         os.makedirs(directory, exist_ok=True)


# cache.clean()

# cleanDir(os.path.join('.', '.next', 'cache'),expire_interval=100)
# # cleanDir(os.path.join('.', 'node_modules'),expire_interval=50)
