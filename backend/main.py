from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils.file_utils import extract_text
from utils.summarizer import summarize_text
from utils.qa_engine import ask_question

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

# Upload endpoint: Extract text + summarize
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        text = extract_text(contents, file.filename)
        summary = summarize_text(text)
        return {"summary": summary, "text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Q&A endpoint
@app.post("/ask/")
async def ask(data: dict):
    try:
        question = data["question"]
        text = data["text"]
        answer = ask_question(question, text)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
