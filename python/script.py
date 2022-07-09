from github import getRequest
from generated import save

user = getRequest("https://api.github.com/users/LittleTealeaf").json()


save("neofetch.json", {
    "repo_count": user['public_repos']
})
