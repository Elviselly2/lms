import { useEffect, useState } from "react";
import CreateCourse from "./CreateCourse";
import Courses from "./Courses";

function Dashboard({ setIsLoggedIn }) {
  const [role, setRole] = useState("");
  const [view, setView] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    }
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-5xl mx-auto">
      
      <h2 className="text-3xl font-bold mb-6  text-blue-600 ">LMS Dashboard</h2>
      <p className="text-green-600 mb-6 font-bold">
         <span className="font-semibold">{role}</span> Active
      </p>

      {/* ACTION PANEL */}
      <div className=" p-4 rounded-xl shadow mb-6">
        {role === "admin" && (
          <div className="flex gap-3">
            <button
              onClick={() => setView("create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Create Course
            </button>

            <button
              onClick={() => setView("courses")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Manage Courses
            </button>
          </div>
        )}

        {role === "learner" && (
          <button
            onClick={() => setView("courses")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            View Courses
          </button>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="bg-white p-6 rounded-xl shadow">
        {view === "create" && <CreateCourse />}
        {view === "courses" && <Courses />}
      </div>

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}
        className="mt-6 text-red-500 hover:underline"
      >
        Logout
      </button>
    </div>
  </div>
);
  
}

export default Dashboard;