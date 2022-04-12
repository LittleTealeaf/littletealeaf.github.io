import os
import libs.github as Github
import urllib3
import bs4
# Wrapper for some common functions used in github


def render_README(repo_api=None,repo_url=None):
    if not repo_api:
        repo_api = Github.getAPI(repo_url)
    contents = Github.getAPI(str(repo_api['contents_url']).format(**{'+path':''}))
    for file in contents:
        if str(file['name']).lower() == 'readme.md':
            with urllib3.PoolManager().request('GET',file['download_url'],preload_content=False) as r:
                content = Github.renderMarkdown('\n'.join([line.decode('utf-8') for line in r]))
                content = correct_links(content, repo_api)

                return content


def correct_links(html_data, repo_api):
    soup = bs4.BeautifulSoup(html_data,'html.parser')
    for a in soup.findAll("a",recursive=True):
        if not (str(a['href']).startswith('#') or str(a['href']).startswith('http') or str(a['href']).startswith('www.')):
            a['href'] = f'https://github.com/{repo_api["full_name"]}/blob/{repo_api["default_branch"]}/{a["href"]}'
    for img in soup.findAll('img',recursive=True):
        if not (str(img['src']).startswith('#') or str(img['src']).startswith('http') or str(img['src']).startswith('www.')):
            img['src'] = f'https://raw.githubusercontent.com/{repo_api["full_name"]}/{repo_api["default_branch"]}/{img["src"]}'
    return str(soup)
