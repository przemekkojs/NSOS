from sentence_transformers import SentenceTransformer, util
from .names import *

def chunk_text(text, size=800, overlap=200):
    chunks = []
    start = 0

    while start < len(text):
        end = start + size
        chunk = text[start:end]
        chunks.append(chunk)
        start += size - overlap

    return chunks


class RagEngine:
    def __init__(self, raw_docs):
        self.docs = []

        for doc in raw_docs:
            self.docs.extend(chunk_text(doc))

        self.embedder = SentenceTransformer(RAG_1, device='cpu')
        self.doc_embeddings = self.embedder.encode(self.docs, convert_to_tensor=True, batch_size=8, show_progress_bar=False)

    def retrieve(self, query, top_k=2):
        q_emb = self.embedder.encode(query, convert_to_tensor=True, batch_size=1, show_progress_bar=False)
        k = min(top_k, len(self.docs))

        if k == 0:
            return []
        
        scores = util.cos_sim(q_emb, self.doc_embeddings)[0]
        top_results = scores.topk(k)
        idxs = top_results.indices.tolist()

        return [self.docs[i] for i in idxs]    
