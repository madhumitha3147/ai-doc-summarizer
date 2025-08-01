# 🧠 AI Doc Summarizer

AI Doc Summarizer is a full-stack web application that allows users to upload documents and get concise AI-generated summaries using state-of-the-art natural language processing models.

---

## 🚀 Features

- 📄 Upload PDF or DOCX files
- ✂️ Extract and summarize long documents into short and meaningful text
- 🌐 Built with React (frontend) and Django/FastAPI (backend)
- 🤖 Uses Hugging Face transformers for summarization
- 🔒 Token-based secure API access (environment-based)

---

## 📁 Project Structure

```

AI-doc-summarizer/
├── frontend/       # React + Tailwind frontend
├── backend/        # Django/FastAPI backend
├── .gitignore
├── README.md

````

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Python, FastAPI 
- **AI Model:** Hugging Face Transformers (`t5-small`, `bart`, etc.)
- **Deployment (Optional):** Vercel (frontend), Render/Heroku (backend)

---

## 💻 Setup Instructions

### 1️⃣ Backend (Python + FastAPI or Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Create a .env file with your Hugging Face token
uvicorn main:app --reload
````

### 2️⃣ Frontend (React + Vite + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Example Usage

1. Upload a `.pdf` or `.docx` file.
2. Click **Summarize**.
3. See the AI-generated summary instantly!

---

## 📦 Environment Variables

Create a `.env` file inside the backend folder:

```
HUGGINGFACE_TOKEN=your_hf_token_here
```

---

---

## 🙋‍♀️ Author

**Pammina Madhumitha**
[GitHub Profile](https://github.com/madhumitha3147)

---

## ⭐️ Support

If you found this project helpful, please consider giving it a ⭐ on [GitHub](https://github.com/madhumitha3147/ai-doc-summarizer)!

```
---

