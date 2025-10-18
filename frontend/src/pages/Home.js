import React from "react";
import "./Home.css";

export default function Home({ user }) {
  return (
    <div className="home-container">
      <h1 className="home-title">📊 Placement Dashboard</h1>

      <p className="home-description">
        This demo stores users and placement entries in your browser's
        <strong> localStorage</strong>. Use <em>Register → Login → Placement Form</em>.
      </p>

      {user ? (
        <div className="home-user-message success">
          <p>✅ You're logged in as <strong>{user.name}</strong>.</p>
        </div>
      ) : (
        <div className="home-user-message warning">
          <p>⚠️ Please login or register to add placement entries.</p>
        </div>
      )}

      <section className="home-info-section">
        <h2 className="home-subtitle">About This App</h2>
        <p className="home-info-text">
          This is a simple React application that demonstrates:
        </p>
        <ul className="home-list">
          <li>✅ Routing with <strong>React Router</strong></li>
          <li>✅ User authentication</li>
          <li>✅ Data storage using <strong>localStorage</strong></li>
          <li>✅ Conditional rendering based on user state</li>
        </ul>
        <p className="home-info-text">
          Built as a learning project to demonstrate a small but functional placement
          dashboard.
        </p>
      </section>
    </div>
  );
}
