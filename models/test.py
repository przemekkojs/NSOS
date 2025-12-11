from rag import RagEngine
from llm import generate, generate_prompt
from docs import fetch_docs

if __name__ == "__main__":
    raw_docs:list = fetch_docs('przemekkojs', "NSOS")
    rag = RagEngine(raw_docs)

    question = input('>>> ')

    if question == "":
        answer:str = "Przepraszam, nie znam odpowiedzi na to pytanie."
    else:
        retrieved:list = rag.retrieve(question)
        prompt:str = generate_prompt(question, retrieved)
        answer:str = generate(prompt)
    
    print(answer)
