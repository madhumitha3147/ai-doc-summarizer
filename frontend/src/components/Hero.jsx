// Hero.jsx
import React from "react";

const Hero = ({ onSummarizeClick }) => {
  return (
    <section className="w-screen h-screen flex flex-col-reverse md:flex-row items-center justify-between px-8 py-20 bg-gradient-to-r from-purple-50 via-white to-purple-100">
      
      {/* Left Content */}
      <div className="md:w-1/2 w-full space-y-6 text-center md:text-left px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Summarize your <br className="hidden md:inline" /> documents instantly
        </h1>
        <p className="text-gray-600 text-lg">
          Upload any file and get a smart, source-backed summary in seconds.
        </p>
        <button
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-200"
          onClick={onSummarizeClick}
        >
          Summarize your document →
        </button>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 w-full flex justify-center items-center mb-12 md:mb-0">
        <img
          src="/demo.png"
          alt="Illustration"
          className="rounded-xl shadow-2xl w-full max-w-md"
        />
        {/* You can optionally use a video instead */}
        {/*
        <video
          src="/assets/demo.mp4"
          autoPlay
          loop
          muted
          className="rounded-xl shadow-xl w-full max-w-md"
        />
        */}
      </div>
    </section>
  );
};

export default Hero;
