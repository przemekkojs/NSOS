from fastapi import FastAPI
from contextlib import asynccontextmanager

from .docs import fetch_docs
from .rag import RagEngine
from .names import LLM_4
from .api import router

@asynccontextmanager
async def lifespan(app: FastAPI):
    raw_docs = fetch_docs('przemekkojs', "NSOS")
    app.state.rag = RagEngine(raw_docs)
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(router)