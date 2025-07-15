// src/components/AskQuestion.jsx
import React, { useState } from "react";
import axios from "axios";

const AskQuestion = ({ text }) => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/ask/", {
        question,
        text,
      });
      setChat([...chat, { question, answer: response.data.answer }]);
      setQuestion("");
    } catch (error) {
      setChat([...chat, { question, answer: "Error fetching answer." }]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 border rounded space-y-4">
      <h2 className="text-lg font-semibold">Ask a Question</h2>
      <div className="space-y-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          className="w-full border p-2 rounded"
        />
        <button
          onClick={ask}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      <div className="space-y-3">
        {chat.map((entry, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded border">
           <p className="text-black"><strong>Q:</strong> {entry.question}</p>
           <p className="text-purple-700"><strong>A:</strong> {entry.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AskQuestion;
