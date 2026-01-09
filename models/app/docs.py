import requests

from paths import docs_save_path

def fetch_docs(repo_owner:str, repo_name:str, path:str="") -> list[str]:
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

def save_docs() -> None:
    docs:list[str] = fetch_docs("przemekkojs", "NSOS")

    with open(docs_save_path, mode='w', encoding='utf-8') as file:
        file.writelines(docs)

def get_docs() -> list[str]:
    result:list[str] = []

    with open(docs_save_path, mode='r', encoding='utf-8') as file:
        result = file.readlines()

    print(result)
    
    return result
