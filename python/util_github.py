import os
import requests
import sys
import time
import datetime
import util_analytics as analytics
import util_images as images
import util_json as json


TOKEN: str = None
if os.path.exists(os.path.join('.','github_token')):
    with open(os.path.join('.','github_token')) as file:
        TOKEN = file.readline();
else:
    TOKEN = os.getenv('API_GITHUB')

if not TOKEN:
    print("ERROR: NO GITHUB API TOKEN PROVIDED")
    print("Please provide a Github API key either as an environment variable API_GITHUB or within the file github_token")
    sys.exist(1)

