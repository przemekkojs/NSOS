from app.docs import save_docs

if __name__ == "__main__":
    try:
        print("Fetching docs...")
        save_docs()
        print("Saved!")
    except Exception as e:
        print("Something went wrong...")
        print(str(e))

