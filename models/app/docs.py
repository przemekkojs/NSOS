from os import listdir
from os.path import isfile, join
import requests

from .paths import docs_save_path


def fetch_docs(repo_owner: str, repo_name: str, path: str = "") -> list[str]:
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

        if item["name"].endswith((".md")):
            file_content = requests.get(item["download_url"]).text
            docs.append(file_content)

    return docs


def save_docs() -> None:
    docs: list[str] = fetch_docs("przemekkojs", "NSOS")

    for i, f in enumerate(docs):
        path = f"{docs_save_path}/doc_{i}"

        with open(path, mode="w", encoding="utf-8") as file:
            file.writelines(f)


def get_docs(debug=False) -> list[str]:
    result: list[str] = []
    files = [
        f"{docs_save_path}/{f}"
        for f in listdir(docs_save_path)
        if isfile(join(docs_save_path, f))
    ]

    if debug:
        print(files)

    for f in files:
        with open(f, mode="r", encoding="utf-8") as file:
            contents = file.read()
            result.append(contents)

            if debug:
                print(contents)

    if debug:
        print(result)

    return result
