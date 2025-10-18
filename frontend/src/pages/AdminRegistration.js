import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";


export default function AdminRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Replace with actual backend API call
    console.log("Register admin:", formData);

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    // Simulate successful registration
    setTimeout(() => {
      navigate("/admin/login");
    }, 1000);
  };

  return (
    <div className="admin-login-container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Registration</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />

        {error && <div className="error">{error}</div>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
