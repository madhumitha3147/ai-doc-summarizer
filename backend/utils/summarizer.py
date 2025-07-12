import os
import requests
from dotenv import load_dotenv

load_dotenv()

# ✅ Updated model
API_URL = "https://api-inference.huggingface.co/models/Falconsai/text_summarization"
HEADERS = {"Authorization": f"Bearer {os.getenv('HF_API_TOKEN')}"}

MAX_CHARS = 1000  # adjust if needed based on the model's token limit

def call_huggingface_api(text):
    response = requests.post(API_URL, headers=HEADERS, json={"inputs": text})
    result = response.json()

    if isinstance(result, dict) and "error" in result:
        raise Exception(f"Hugging Face API error: {result['error']}")

    return result[0]["summary_text"]

def chunk_text(text, max_chars=MAX_CHARS):
    paragraphs = text.split("\n")
    chunks, current = [], ""

    for p in paragraphs:
        if len(current) + len(p) <= max_chars:
            current += p + "\n"
        else:
            chunks.append(current.strip())
            current = p + "\n"
    if current:
        chunks.append(current.strip())

    return chunks

def summarize_text(full_text):
    chunks = chunk_text(full_text)
    print(f"Splitting into {len(chunks)} chunks...")

    summaries = []
    for i, chunk in enumerate(chunks):
        print(f"Summarizing chunk {i + 1}/{len(chunks)}...")
        summary = call_huggingface_api(chunk)
        summaries.append(summary)

    final_summary = " ".join(summaries)
    return final_summary
