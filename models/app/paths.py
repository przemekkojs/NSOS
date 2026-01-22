from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent  # folder, w którym leży paths.py

llm_save_path = f"{BASE_DIR}/saved/llm"
rag_save_path = f"{BASE_DIR}/saved/rag"
docs_save_path = f"{BASE_DIR}/local"