import React, { useState } from "react";

/*
  Register:
  - Collects name, email, password
  - Stores in localStorage under "users" array
  - Calls onRegister(user) prop on success
*/
export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(""); setMsg("");

    if (!name || !email || !password) {
      setErr("Fill all fields.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setErr("Email already registered. Try logging in.");
      return;
    }
    const user = { id: Date.now(), name, email, password };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    setMsg("Registered! Logging in...");
    // auto-login
    onRegister(user);
  };

  return (
    <div>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required/>
        <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        {err && <div className="error">{err}</div>}
        {msg && <div className="success">{msg}</div>}
        <div className="row">
          <button className="btn" type="submit">Create account</button>
        </div>
      </form>
    </div>
  );
}
