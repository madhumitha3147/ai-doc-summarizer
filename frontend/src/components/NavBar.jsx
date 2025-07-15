import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate(); // Required for navigation

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div
        className="text-xl font-bold text-purple-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        🧠 SummarAI
      </div>
      <div className="space-x-4">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          onClick={() => navigate("/signin")}
        >
          Sign in
        </button>
        
      </div>
    </nav>
  );
};

export default NavBar;
