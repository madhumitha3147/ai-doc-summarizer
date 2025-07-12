import fitz  # PyMuPDF

def extract_text(file_bytes, filename):
    if filename.endswith(".pdf"):
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        return "\n".join([page.get_text() for page in doc])
    return "Unsupported file format"
