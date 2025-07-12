// src/components/SummaryView.jsx
import React, { useState } from "react";

const SummaryView = ({ summary, text }) => {
  const [showText, setShowText] = useState(false);

  return (
    <div className="bg-gray-100 p-4 rounded space-y-4">
      <h2 className="text-xl font-semibold">Summary</h2>
      <p>{summary}</p>

      <button
        onClick={() => setShowText(!showText)}
        className="mt-4 text-blue-600 underline"
      >
        {showText ? "Hide Original Document" : "Show Original Document"}
      </button>

      {showText && (
        <div className="mt-2 p-3 bg-white border rounded max-h-64 overflow-y-scroll text-sm whitespace-pre-wrap">
          {text}
        </div>
      )}
    </div>
  );
};

export default SummaryView;
