import os
import shutil
import libs.cachelib as cache

BUILD_CACHE_PARTIAL = 50
BUILD_CACHE_FULL = 500
NEXTJS_CACHE_FULL = 70

def is_interval(interval):
    return ('RUN_NUMBER' in os.environ and interval != -1 and int(os.environ['RUN_NUMBER']) % interval == 0)

cache.clean(partial_wipe=is_interval(BUILD_CACHE_PARTIAL), full_wipe=is_interval(BUILD_CACHE_FULL))

if is_interval(NEXTJS_CACHE_FULL):
    shutil.rmtree(os.path.join('.','.nextjs','cache'))
    os.makedirs(os.path.join('.','.nextjs','cache'),exist_ok=True)
