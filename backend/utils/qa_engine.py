import os
import requests
from dotenv import load_dotenv

load_dotenv()

QA_API_URL = "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2"
HEADERS = {"Authorization": f"Bearer {os.getenv('HF_API_TOKEN')}"}

def ask_question(question, context):
    token = os.getenv('HF_API_TOKEN')
    if not token:
        raise Exception("Hugging Face token not set in environment variables")

    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "inputs": {
            "question": question,
            "context": context[:1000]  # Ensure max context size
        }
    }

    response = requests.post(QA_API_URL, headers=headers, json=payload)
    print("Status Code:", response.status_code)

    try:
        result = response.json()
        print("Hugging Face Response:", result)
    except Exception as e:
        raise Exception("Invalid JSON returned from Hugging Face API")

    if isinstance(result, dict) and "error" in result:
        raise Exception(f"Hugging Face API Error: {result['error']}")

    return result.get("answer", "Sorry, I couldn't find an answer.")
