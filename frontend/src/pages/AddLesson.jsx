import { useState } from "react";

function AddLesson({ courseId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = async () => {
    await fetch("http://localhost:5000/api/lessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId,
        title,
        content,
      }),
    });

    alert("Lesson added!");
  };

  

  return (
    <div className="max-w-md mx-auto bg-gray-300 p-6 rounded-xl shadow">
      <h4 className="text-xl font-bold mb-4 text-center">
        Add Lesson
      </h4>

      <div className="flex flex-col gap-4">
        <input
          placeholder="Lesson title"
          onChange={(e) => setTitle(e.target.value)}
          className=" text-bold border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Add Lesson
        </button>
      </div>
    </div>
  );
}

export default AddLesson;