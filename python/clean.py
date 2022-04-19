import os
import shutil
import libs.cache as cache

BUILD_CACHE_PARTIAL = 250
BUILD_CACHE_FULL = 1000
NEXTJS_CACHE_FULL = 70

def is_interval(interval):
    return ('RUN_NUMBER' in os.environ and interval != -1 and int(os.environ['RUN_NUMBER']) % interval == 0)

cache.clean(partial_wipe=is_interval(BUILD_CACHE_PARTIAL), full_wipe=is_interval(BUILD_CACHE_FULL))
