from multiprocessing import context
import os
import libs.github as Github
import libs.markdown as Markdown
import urllib3
import bs4
# Wrapper for some common functions used in github


def README(repo_name):
    api = Github.getAPI(f'https://api.github.com/repos/{repo_name}')
    contents = Github.getAPI(f'https://api.github.com/repos/{repo_name}/contents')
    for file in contents:
        if str(file['name']).lower() == 'readme.md':
            return Markdown.buildURL(file['download_url'],context=repo_name,link_src=f'https://github.com/{repo_name}/raw/main/',link_href=f'{api["html_url"]}/blob/{api["default_branch"]}/')

def correct_links(html_data, repo_name):
    default_branch = Github.getAPI(f'https://api.github.com/repos/{repo_name}')['default_branch']
    soup = bs4.BeautifulSoup(html_data,'html.parser')
    for a in soup.findAll("a",recursive=True):
        if not (str(a['href']).startswith('#') or str(a['href']).startswith('http') or str(a['href']).startswith('www.')):
            a['href'] = f'https://github.com/{repo_name}/blob/{default_branch}/{a["href"]}'
    for img in soup.findAll('img',recursive=True):
        if not (str(img['src']).startswith('#') or str(img['src']).startswith('http') or str(img['src']).startswith('www.')):
            img['src'] = f'https://raw.githubusercontent.com/{repo_name}/{default_branch}/{img["src"]}'
    return str(soup)
