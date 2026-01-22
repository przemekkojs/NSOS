import os
import requests
import httpx
import json

from dotenv import load_dotenv

from .names import LLM_3, LLM_4

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
API_URL = "https://router.huggingface.co/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {HF_TOKEN}",
}


# def generate_prompt(question: str, docs: (list[str] | None)) -> str:
#     if not question:
#         raise ValueError("Question cannot be empty")
#     if docs is None:
#         docs = []

#     docs_text = "".join(docs)

#     return (
#         f"""Jesteś asystentem systemu obsługi studentów.\n
#         Odpowiedz na zadane pytanie TYLKO w oparciu o dostarczoną dokumentację.\n
#         Dokumentacja:\n{docs_text}\n
#         Pytanie:\n{question}\n"""
#     )


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)

    return response.json()


def retrieve_answer(response: dict, model_name: str) -> str:
    error_dict = [{"message": {"content": str(response)}}]

    mapping: dict[str, str] = {
        LLM_3: response.get("choices", error_dict)[0]["message"]["content"],
        LLM_4: response.get("choices", error_dict)[0]["message"]["content"]
    }

    return mapping[model_name]


def get_messages(question:str, docs:list[str]):
    docs_str:str = "".join(docs)
    to_remove = ["*", "_", '#']
    docs_str = "".join(c for c in docs_str if c not in to_remove)

    print(docs_str)

    return [
        {
            "role": "system",
            "content": f"Jesteś chatbotem systemu uczelnianej obsługi studentów. Odpowiadaj tylko z użyciem dokumentacji: {docs_str}."
        },
        {
            "role": "user",
            "content": question
        }
    ]


def generate(docs: list[str], question: str, model_name: str) -> str:
    try:
        response = query(
            {
                "messages": get_messages(question, docs),
                "model": model_name
            }
        )

        return retrieve_answer(response, model_name)
    except Exception as e:
        return f"Something went wrong... {str(e)}"


async def generate_stream(docs: list[str], question: str, model_name: str):
    payload = {
        "messages": get_messages(question, docs), 
        "model": model_name,
        "stream": True,
    }

    async with httpx.AsyncClient() as client:
        async with client.stream(
            "POST", API_URL, headers=headers, json=payload, timeout=60.0
        ) as response:
            async for line in response.aiter_lines():
                if not line or line.strip() == "":
                    continue

                if line.startswith("data: "):
                    line = line[6:]

                if line.strip() == "[DONE]":
                    break

                try:
                    data = json.loads(line)

                    choices = data.get("choices", [])
                    if not choices:
                        continue  # Skip chunks that don't have text

                    delta = choices[0].get("delta", {})
                    content = delta.get("content", "")

                    if content:
                        yield content

                except json.JSONDecodeError:
                    continue
