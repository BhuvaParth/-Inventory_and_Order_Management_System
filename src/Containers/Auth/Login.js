import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError("All fields are required");
      return;
    }

    const storedUserData = JSON.parse(localStorage.getItem("userData")) || [];
    const userFound = storedUserData.find(
      (user) =>
        user.email === email && user.password === password && user.role === role
    );

    if (userFound) {
      handleLogin(email); 
      navigate("/"); 
    } else {
      setError("Invalid email, password, or role");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-black placeholder-black rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-black placeholder-black rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Role</label>
            <select
              className="w-full px-4 py-2 border border-black placeholder-black rounded-lg focus:outline-none focus:border-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
