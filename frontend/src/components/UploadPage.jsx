import React, { useState, useRef } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Loader from "./Loader";
import AskQuestion from "./QuestionBox";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const [answer, setAnswer] = useState("");


  const summaryRef = useRef(null);
  const textRef = useRef(null);

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/upload/", formData);
      setSummary(res.data.summary);
      setText(res.data.text);
      setShowText(false);

      // 🔽 Scroll to summary
      setTimeout(() => summaryRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
    } catch (err) {
      alert("Upload failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/upload-url/", { url });
      setSummary(res.data.summary);
      setText(res.data.text);
      setShowText(false);

      // 🔽 Scroll to summary
      setTimeout(() => summaryRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
    } catch (err) {
      alert("Fetching from URL failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadSummary = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-purple-50 via-white to-purple-100 flex flex-col">
      <NavBar />

      <div className="flex-grow flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl bg-white bg-opacity-90 p-8 md:p-10 rounded-xl shadow-xl space-y-10">
          {/* File Upload Form */}
          <form onSubmit={handleFileSubmit} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">📁 Upload a File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {file && <p className="text-sm text-gray-600 mt-1">📄 Selected: {file.name}</p>}
            <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
              Upload & Summarize
            </button>
          </form>

          <div className="text-center text-gray-500 font-medium">— or —</div>

          {/* URL Upload Form */}
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">🔗 Enter a File URL</label>
            <input
              type="text"
              placeholder="https://example.com/document.pdf"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
              Fetch & Summarize
            </button>
          </form>
          {loading && <Loader />}
        </div>
      </div>

      {/* 📄 Summary & 📚 Extracted Text */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {summary && (
          <div ref={summaryRef}>
            <h2 className="text-gray-700 text-xl font-bold mb-2">📄 Summary</h2>
            <p className="bg-white text-purple-700 p-4 rounded shadow">{summary}</p>
            <button
              onClick={downloadSummary}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
            >
              ⬇️ Download Summary
            </button>
          </div>
        )}

        {text && (
          <div className="mt-6">
            <button
              onClick={() => {
                setShowText((prev) => {
                  const next = !prev;
                  if (!prev) {
                    setTimeout(() => textRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
                  }
                  return next;
                });
              }}
              className="bg-white text-purple-700 p-4 rounded shadow underline"
            >
              {showText ? "Hide Full Text" : "Show Full Text"}
            </button>

            {showText && (
              <div ref={textRef} className="mt-3">
                <h2 className="text-gray-700 text-xl font-bold mb-2">📚 Extracted Text</h2>
                <p className="bg-white text-purple-700 p-4 rounded shadow max-h-[400px] overflow-auto whitespace-pre-wrap">
                  {text}
                </p>
              </div>
            )}
          </div>
        )}
        {/* 🧠 Ask Homework Questions */}
        {text && (
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
            <h2 className="text-gray-700 text-xl font-bold">❓ Ask Questions from the Text</h2>
            <AskQuestion text={text} />
          </div>
        )}

      </div>
    </div>
  );
}
