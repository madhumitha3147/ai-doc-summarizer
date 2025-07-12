// frontend/src/components/UploadForm.jsx
import React, { useState } from "react";
import axios from "axios";

export default function UploadForm({ setSummary, setText }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/upload/", formData);
      setSummary(res.data.summary);
      setText(res.data.text);
    } catch (err) {
      alert("Upload failed.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload & Summarize
      </button>
    </form>
  );
}
