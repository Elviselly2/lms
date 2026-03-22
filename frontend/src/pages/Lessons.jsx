import { useEffect, useState } from "react";

function Lessons({ courseId }) {
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);

  // Fetch lessons
  useEffect(() => {
    fetch(`http://localhost:5000/api/lessons/${courseId}`)
      .then((res) => res.json())
      .then((data) => setLessons(data));
  }, [courseId]);

  // Fetch progress
  useEffect(() => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));

    fetch(`http://localhost:5000/api/progress/${payload.id}`)
      .then((res) => res.json())
      .then((data) => setProgress(data));
  }, []);

  // Mark complete
  const markComplete = async (lessonId) => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));

    await fetch("http://localhost:5000/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: payload.id,
        lessonId,
      }),
    });

    alert("Lesson completed!");

    // refresh progress
    window.location.reload();
  };
return (
  <div className="mt-6">
    <h3 className="text-2xl font-bold mb-4">Lessons</h3>

    {/* PROGRESS TEXT */}
    <p className="mb-2 text-gray-600">
      Progress: {progress.length} / {lessons.length}
    </p>

    {/* 🔥 PROGRESS BAR */}
    <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
      <div
        className="bg-green-500 h-3 rounded-full transition-all duration-300"
        style={{
          width: `${(progress.length / lessons.length) * 100 || 0}%`,
        }}
      ></div>
    </div>

    {/* LESSON CARDS */}
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
        >
          <h4 className="text-lg font-semibold">{lesson.title}</h4>
          <p className="text-gray-600 mb-3">{lesson.content}</p>

          <button
            onClick={() => markComplete(lesson.id)}
            className="bg-blue-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
          >
            Mark Complete
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default Lessons;