import { useState } from "react";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleCreate = async () => {
    const res = await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, category }),
    });

    const data = await res.json();
    console.log(data);

    alert("Course created!");
  };
return (
  <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
    <h3 className="text-2xl font-bold mb-4 text-center">
      Create Course
    </h3>

    <div className="flex flex-col gap-4">
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleCreate}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
      >
        Create Course
      </button>
    </div>
  </div>
);
}

export default CreateCourse;