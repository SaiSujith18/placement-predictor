import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">ℹ️ About This App</h1>

      <p className="about-description">
        This Placement Predictor app is designed to simulate a placement tracking
        dashboard. It allows users to register, login, submit placement information,
        and view recommendations.
      </p>

      <section className="about-section">
        <h2 className="about-subtitle">Features</h2>
        <ul className="about-list">
          <li>✅ User registration and login</li>
          <li>✅ Placement form submission</li>
          <li>✅ Recommendation list based on placement data</li>
          <li>✅ Data persistence using localStorage</li>
          <li>✅ Simple React Router-based navigation</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="about-subtitle">Purpose</h2>
        <p className="about-text">
          This project is intended as a demonstration of how to build a simple
          single-page application (SPA) with React. It is a great example for
          beginners to understand routing, authentication, and localStorage.
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-subtitle">Tech Stack</h2>
        <ul className="about-list">
          <li>React.js</li>
          <li>React Router</li>
          <li>JavaScript (ES6+)</li>
          <li>HTML5 & CSS3</li>
          <li>LocalStorage API</li>
        </ul>
      </section>
    </div>
  );
}
