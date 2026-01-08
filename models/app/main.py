from fastapi import FastAPI
from contextlib import asynccontextmanager

from docs import get_docs
from rag import RagEngine
from api import router
from dotenv import load_dotenv

@asynccontextmanager
async def lifespan(app: FastAPI):
    raw_docs:list[str] = get_docs()
    app.state.rag = RagEngine(raw_docs)
    yield

print("Models service starting...")

load_dotenv()
app = FastAPI(lifespan=lifespan)
app.include_router(router)

print("Models service up!")