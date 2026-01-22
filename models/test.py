from app.rag import RagEngine
from app.llm import generate, generate_prompt
from app.docs import get_docs
from app.names import LLM_4

if __name__ == "__main__":
    raw_docs:list = get_docs('przemekkojs', "NSOS")
    rag = RagEngine(raw_docs)

    question = input('>>> ')

    if question == "":
        answer:str = "Przepraszam, nie znam odpowiedzi na to pytanie."
    else:
        retrieved:list = rag.retrieve(question)
        prompt:str = generate_prompt(question, retrieved)
        answer:str = generate(prompt, LLM_4)
    
    print(answer)
