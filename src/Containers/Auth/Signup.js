import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    const userData = {
      username,
      email,
      password,
      role,
    };

    const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
    const emailExists = existingUsers.some((user) => user.email === email);
    if (emailExists) {
      setError("This email is already registered");
      return;
    }

    existingUsers.push(userData);
    localStorage.setItem("userData", JSON.stringify(existingUsers));

    setError("");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-black placeholder-black rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-black placeholder-black rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-black placeholder-black rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-black placeholder-black rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
