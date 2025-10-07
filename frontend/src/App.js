import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";

import PlacementForm from "./components/PlacementForm";
import RecommendationList from "./components/RecommendationList";
import Home from "./pages/Home";
import About from "./pages/About";
import FAQ from "./pages/Faq";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserForm from "./pages/UserForm";

function App() {
  const [user, setUser] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));

    sendPredictionRequest(); // call prediction request on load
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("adminToken");
    setUser(null);
    navigate("/login");
  };

  // ---------------- Prediction Request ----------------
  const sendPredictionRequest = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: {
            cgpa: 7,
            communication: 7,
            internship: 1,
            iq: 120,
            projects: 2,
            training: 1,
            technical: 1
          },
          skills: ["python", "react"],
          role: "developer"
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Prediction error:", errData);
        setPredictionResult("Error: " + errData.error);
        return;
      }

      const result = await res.json();
      console.log("Prediction result:", result);
      setPredictionResult(result);

    } catch (error) {
      console.error("Error calling backend:", error);
      setPredictionResult("Error calling backend");
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/placement">Placement Form</NavLink>
        <NavLink to="/recommendations">Recommendations</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/users">Users</NavLink>
        {!user && <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/admin/login">Admin Login</NavLink>
        </>}
        {user && <>
          <span style={{ marginLeft: "auto" }}>Hello, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </>}
      </nav>

      {/* Prediction Output */}
      <div style={{ padding: "20px", color: "#333" }}>
        <h4>Prediction Result:</h4>
        <pre style={{ background: "#eef", padding: "10px", borderRadius: "8px" }}>
          {predictionResult ? JSON.stringify(predictionResult, null, 2) : "No prediction yet"}
        </pre>
      </div>

      {/* Main Content */}
      <div className="card">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/placement" element={<PlacementForm user={user} />} />
          <Route path="/recommendations" element={<RecommendationList />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/users" element={<UserForm />} />
          <Route path="/login" element={
            <Login onLogin={(u) => {
              setUser(u);
              localStorage.setItem("currentUser", JSON.stringify(u));
              navigate("/placement");
            }} />}
          />
          <Route path="/register" element={
            <Register onRegister={(u) => {
              setUser(u);
              localStorage.setItem("currentUser", JSON.stringify(u));
              navigate("/placement");
            }} />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          <Route path="*" element={<Home user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
