import os
from dotenv import load_dotenv
import requests

load_dotenv()

github_token = os.environ.get("API_GITHUB")


def getRequest(url: str, headers: dict = {}, params: dict = {}):
    headers = headers.copy()
    headers['authorization'] = f'token {github_token}'
    request = requests.get(url, params=params, headers=headers)
    if request.status_code == 200:
        return request
    else:
        return None
