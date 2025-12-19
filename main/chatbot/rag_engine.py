# To jest potrzebne jakbyśmy jednak integrowali wszystko "razem"
# Jak dostanę approve, to zmigruję potrzebne skrypty tutaj, na razie zrobię o tak

from ...models.app.rag import RagEngine
from ...models.app.docs import fetch_docs
import threading

# Generalnie potrzeba zrobić dobry life-span na tego typu obiekt
_lock = threading.Lock()
_rag_instance = None

def get_rag():
    global _rag_instance

    if _rag_instance is None:
        with _lock:
            if _rag_instance is None:
                docs = fetch_docs('przemekkojs', "NSOS")
                _rag_instance = RagEngine(docs)

    return _rag_instance