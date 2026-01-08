from fastapi import Request, APIRouter
from fastapi.responses import StreamingResponse

from llm import generate, generate_prompt, generate_stream
from names import LLM_4

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


@router.post("/chat-stream")
async def chat_stream(request: Request, question: str):
    rag = request.app.state.rag

    if not question.strip():
        return {"answer": "Przepraszam, nie znam odpowiedzi na to pytanie."}

    retrieved = rag.retrieve(question)
    prompt = generate_prompt(question, retrieved)

    return StreamingResponse(
        generate_stream(prompt, LLM_4), media_type="text/event-stream"
    )
