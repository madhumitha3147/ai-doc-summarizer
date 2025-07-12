// src/components/UploadPage.jsx
import React, { useState } from "react";
import UploadForm from "./UploadForm";
import SummaryView from "./SummaryView";
import AskQuestion from "./QuestionBox";
import Loader from "./Loader";
import NavBar from "./NavBar";

const UploadPage = () => {
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  return (
    <div className="w-screen min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      <NavBar />
      <section className="w-full py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-10">
          <UploadForm setSummary={setSummary} setText={setText} setLoading={setLoading} />
          {loading && <Loader />}
          {summary && (
            <>
              <SummaryView summary={summary} text={text} />
              <AskQuestion text={text} answer={answer} setAnswer={setAnswer} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default UploadPage;
