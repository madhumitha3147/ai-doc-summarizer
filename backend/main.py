from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.file_utils import extract_text
from utils.summarizer import summarize_text
from utils.qa_engine import ask_question
import requests

# Initialize FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload from local file endpoint
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        text = extract_text(contents, file.filename)
        summary = summarize_text(text)
        return {"summary": summary, "text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Upload from URL endpoint
class URLRequest(BaseModel):
    url: str

@app.post("/upload-url/")
async def upload_from_url(data: URLRequest):
    try:
        response = requests.get(data.url)
        if response.status_code != 200:
            raise Exception("Unable to fetch file from URL.")

        filename = data.url.split("/")[-1]
        contents = response.content

        text = extract_text(contents, filename)
        summary = summarize_text(text)
        return {"summary": summary, "text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Question answering endpoint
@app.post("/ask/")
async def ask(data: dict):
    try:
        question = data["question"]
        text = data["text"]
        answer = ask_question(question, text)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
