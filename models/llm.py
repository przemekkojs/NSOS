# from transformers import AutoTokenizer, AutoModelForCausalLM
# import torch
# from paths import llm_save_path

# tokenizer = AutoTokenizer.from_pretrained(llm_save_path, fix_mistral_regex=True)
# model = AutoModelForCausalLM.from_pretrained(llm_save_path)

# # To potem można łatwo zmienić, żeby korzystać z Hugging Face - nie będzie trzeba mieć modelu lokalnie
# def generate(prompt):
#     inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
#     output = model.generate(**inputs, max_new_tokens=300)
#     return tokenizer.decode(output[0], skip_special_tokens=True)

import os
import requests
from dotenv import load_dotenv
from names import LLM_4

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
API_URL = "https://router.huggingface.co/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {HF_TOKEN}",
}

def generate_prompt(question: str, docs: list[str]) -> str:
    if not question:
        raise ValueError("Question cannot be empty")
    if docs is None:
        docs = []

    docs_text = "\n\n".join(docs)

    return (
        "Jesteś asystentem systemu obsługi studentów.\n"
        "Odpowiedz na zadane pytanie TYLKO w oparciu o dostarczoną dokumentację.\n\n"
        f"Dokumentacja:\n{docs_text}\n\n"
        f"Pytanie:\n{question}\n"
        "Odpowiedź:"
    )

def query(payload):
    response = requests.post(
        API_URL,
        headers=headers,
        json=payload
    )

    return response.json()

def generate(prompt: str) -> str:
    try:
        response = query({
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "model": LLM_4
        })

        ans:str = response['choices'][0]['message']['content']

        return ans
    except Exception:
        return "Something went wrong..."
