# To jest potrzebne jakbyśmy jednak integrowali wszystko "razem"
# Jak dostanę approve, to zmigruję potrzebne skrypty tutaj, na razie zrobię o tak

from django.http import JsonResponse
from rag_engine import get_rag

from ...models.app.llm import generate, generate_prompt
from ...models.app.names import LLM_4


def chat(request):
    question = request.POST.get("question", "")

    if not question.strip():
        return JsonResponse({
            "answer": "Przepraszam, nie znam odpowiedzi na to pytanie."
        })

    rag = get_rag()

    retrieved = rag.retrieve(question)
    prompt = generate_prompt(question, retrieved)
    answer = generate(prompt, LLM_4)

    return JsonResponse({"answer": answer})
