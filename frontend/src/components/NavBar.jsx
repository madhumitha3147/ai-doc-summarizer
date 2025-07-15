import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div
        className="text-xl font-bold text-purple-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        🧠 SummarAI
      </div>

      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-purple-600 font-medium">
              👋 Hi, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/signin")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
