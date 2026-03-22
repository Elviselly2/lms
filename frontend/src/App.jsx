import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [page, setPage] = useState("login");

  if (isLoggedIn) {
    return <Dashboard setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        LMS Platform
      </h1>

      {/* NAV BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setPage("login")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            page === "login"
              ? "bg-green-600 text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setPage("register")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            page === "register"
              ? "bg-green-600 text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          Register
        </button>
      </div>

      {/* FORM CONTAINER */}
      <div className="w-full max-w-md">
        {page === "login" && <Login setIsLoggedIn={setIsLoggedIn} />}
        {page === "register" && <Register />}
      </div>

    </div>
  );
}

export default App;