from transformers import AutoTokenizer, AutoModelForCausalLM
from sentence_transformers import SentenceTransformer, util
import torch
from .names import *
from .paths import *

if __name__ == "__main__":
    llm_model_name = LLM_2

    tokenizer = AutoTokenizer.from_pretrained(llm_model_name)

    model = AutoModelForCausalLM.from_pretrained(
        llm_model_name,
        device_map="auto",
        torch_dtype=torch.float16
    )    

    model.save_pretrained(llm_save_path)
    tokenizer.save_pretrained(llm_save_path)

    print(f"LLM done")

    rag_model_name: str = RAG_1
    model = SentenceTransformer(rag_model_name)

    model.save(rag_save_path)

    print("RAG done")