import { useEffect, useState } from "react";
import Lessons from "./Lessons";
import AddLesson from "./AddLesson";

function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");
  const payload = JSON.parse(atob(token.split(".")[1]));
  const role = payload.role;

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-3xl font-bold mb-6">Courses</h3>

      <div className="grid md:grid-cols-3 gap-4 bg-gray-300 p-4 rounded-xl shadow">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-brown-900 p-5 rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <h4 className="text-xl font-semibold mb-2">{c.title}</h4>
            <p className="text-gray-600 mb-4">{c.description}</p>

            {/* ADMIN */}
            {role === "admin" && (
              <button
                onClick={() => setSelectedCourse(c.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add Lesson
              </button>
            )}

            {/* LEARNER */}
            {role === "learner" && (
              <button
                onClick={() => setSelectedCourse(c.id)}
                className="bg-blue-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                View Lessons
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 🔥 THIS IS THE MAGIC */}
      <div className="mt-6">
        {selectedCourse && role === "admin" && (
          <div className="bg-gray-100 p-4 rounded-xl shadow">
            <AddLesson courseId={selectedCourse} />
          </div>
        )}

        {selectedCourse && role === "learner" && (
          <div className="bg-gray-100 p-4 rounded-xl shadow">
            <Lessons courseId={selectedCourse} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;