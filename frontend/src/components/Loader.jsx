// src/components/Loader.jsx
import React from "react";

const Loader = () => (
  <div className="flex justify-center items-center py-6">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

export default Loader;
