import os
import requests
from dotenv import load_dotenv

load_dotenv()

QA_API_URL = "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2"
HEADERS = {"Authorization": f"Bearer {os.getenv('HF_API_TOKEN')}"}

def ask_question(question, context):
    payload = {
        "inputs": {
            "question": question,
            "context": context[:1000]
        }
    }

    response = requests.post(QA_API_URL, headers=HEADERS, json=payload)
    print("Status Code:", response.status_code)

    try:
        result = response.json()
        print("Hugging Face Response:", result)
    except Exception as e:
        print("Error decoding JSON:", e)
        raise Exception("Invalid response from Hugging Face")

    if isinstance(result, dict) and "error" in result:
        raise Exception(f"Hugging Face API error: {result['error']}")

    return result.get("answer", "Sorry, I couldn't find an answer.")
