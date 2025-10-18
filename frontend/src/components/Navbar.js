import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, handleLogout }) {
  return (
    <nav className="nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
        About
      </NavLink>
      <NavLink to="/placement" className={({ isActive }) => (isActive ? "active" : "")}>
        Placement Form
      </NavLink>
      <NavLink to="/recommendations" className={({ isActive }) => (isActive ? "active" : "")}>
        Recommendations
      </NavLink>
      <NavLink to="/faq" className={({ isActive }) => (isActive ? "active" : "")}>
        FAQ
      </NavLink>

      {!user && (
        <>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Login
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
            Register
          </NavLink>
        </>
      )}

      {user && (
        <>
          <span style={{ marginLeft: "auto" }} className="small">
            Hello, {user.name}
          </span>
          <button onClick={handleLogout} className="btn" style={{ marginLeft: 8 }}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
