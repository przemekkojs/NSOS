from fastapi import Request, APIRouter

from .llm import generate, generate_prompt
from .names import LLM_4

router = APIRouter()

@router.post("/chat")
async def chat(request: Request, question: str):
    rag = request.app.state.rag
    print(question)

    if not question.strip():
        return {"answer": "Przepraszam, nie znam odpowiedzi na to pytanie."}

    retrieved = rag.retrieve(question)
    prompt = generate_prompt(question, retrieved)
    answer = generate(prompt, LLM_4)

    return {"answer": answer}
