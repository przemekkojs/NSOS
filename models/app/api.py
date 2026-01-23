from fastapi import Request, APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from .llm import generate, generate_stream
from .names import LLM_4
from .rag import RagEngine

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "healthy", "service": "rag"}


@router.post("/chat")
async def chat(request: Request, question: str):
    rag = request.app.state.rag
    print(question)

    if not question.strip():
        return {"answer": "Przepraszam, nie znam odpowiedzi na to pytanie."}

    retrieved = rag.retrieve(question)

    print(retrieved)

    answer = generate(retrieved, question, LLM_4)

    return {"answer": answer}


class StreamBody(BaseModel):
    question: str


@router.post("/chat-stream")
async def chat_stream(request: Request, body: StreamBody):
    rag: RagEngine = request.app.state.rag

    question = body.question.strip()

    if not question:
        return {"answer": "Przepraszam, nie znam odpowiedzi na to pytanie."}

    retrieved = rag.retrieve(question)

    return StreamingResponse(
        generate_stream(retrieved, question, LLM_4), media_type="text/event-stream"
    )
