// src/pages/AdminLogin.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Optional: add styling

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login check — replace with API call
    if (email === "Admin@gmail.com" && password === "Admin123") {
      navigate("/admin-dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
