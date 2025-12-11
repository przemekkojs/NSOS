from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from rag import RagEngine
from llm import generate, generate_prompt
from names import LLM_4

# To jest generalnie TODO TODO TODO

@csrf_exempt
def ask(request, rag:RagEngine):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed!"}, status=405)

    data = json.loads(request.body)
    question = data.get("question", "")

    if question == "":
        answer:str = "Przepraszam, nie znam odpowiedzi na to pytanie."
    else:
        retrieved = rag.retrieve(question)
        prompt:str = generate_prompt(question, retrieved)
        answer:str = generate(prompt, LLM_4)

    return JsonResponse({"answer" : answer})
