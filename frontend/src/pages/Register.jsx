import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner");

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();
    console.log(data);

    if (data.message) {
      alert("Registered successfully");
    } else {
      alert("Registration failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      
      <h2 className="text-2xl font-bold mb-6 text-center">
        Register
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="learner">Learner</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Register
        </button>
      </div>

      {/* OPTIONAL */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account? Login
      </p>
    </div>
  </div>
);
}

export default Register;