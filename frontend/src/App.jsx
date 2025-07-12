import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Hero from "./components/Hero";
import SignIn from "./components/SignIn";
import UploadPage from "./components/UploadPage";
import NavBar from "./components/NavBar";

const Home = () => {
  const navigate = useNavigate();

  const handleSummarizeClick = () => {
    navigate("/upload");
  };

  return (
    <div className="w-screen h-screen bg-white text-gray-800 overflow-x-hidden">
      <NavBar />
      <Hero onSummarizeClick={handleSummarizeClick} />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/upload" element={<UploadPage />} />
    </Routes>
  );
}

export default App;
