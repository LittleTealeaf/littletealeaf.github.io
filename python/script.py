from github import getRequest
from generated import save
from resources import getJson, referenceImage

user = getRequest("https://api.github.com/users/LittleTealeaf").json()


save("neofetch.json", {
    "repo_count": user['public_repos']
})

project_data = getJson("projects")
