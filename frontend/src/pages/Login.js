import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      setErr("Invalid credentials. Tip: register first or check email/password.");
      return;
    }

    // Login success
    onLogin(found);
    localStorage.setItem("currentUser", JSON.stringify(found));
    navigate("/placement");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }

    try {
      // 1️⃣ Call backend to delete account
      const res = await fetch("http://127.0.0.1:5000/api/users/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Delete error:", data);
        alert("Error deleting account: " + (data.error || "Unknown error"));
        return;
      }

      // 2️⃣ Delete locally
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      users = users.filter((u) => u.email.toLowerCase() !== email.toLowerCase());
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("currentUser");

      alert("Account deleted successfully!");
      navigate("/register"); // Redirect after deletion

    } catch (err) {
      console.error("Error calling backend:", err);
      alert("Error deleting account");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {err && <div className="error">{err}</div>}
        <div className="row">
          <button className="btn glow" type="submit">
            Login
          </button>
          <Link to="/register" className="small" style={{ alignSelf: "center" }}>
            Create an account
          </Link>
        </div>
      </form>

      {/* Delete Account Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "5px" }}
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
