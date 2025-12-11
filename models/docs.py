import requests

def fetch_docs(repo_owner:str, repo_name:str, path:str=""):
    api_url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{path}"
    response = requests.get(api_url)

    if response.status_code != 200:
        print("Github error:", response.text)
        return []

    data = response.json()
    docs = []

    for item in data:
        if item["type"] == "dir":
            docs.extend(fetch_docs(repo_owner, repo_name, item["path"]))
            continue

        if item["name"].endswith((".md", ".txt")):
            file_content = requests.get(item["download_url"]).text
            docs.append(file_content)

    return docs
