import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";

import AdminLogins from "./AdminSections/AdminLogins";
import AdminData from "./AdminSections/AdminData";
import AdminFeedbacks from "./AdminSections/AdminFeedbacks";
import AdminAnalytics from "./AdminSections/AdminAnalytics";
import AdminRegistration from "./AdminRegistration";

import "../App.css";
import "./AdminDashboard.css"; // Keep separate styles for clarity

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <aside className="admin-dashboard__sidebar">
        <h2 className="admin-dashboard__title">Admin Panel</h2>
        <nav className="admin-dashboard__nav">
          <NavLink
            to="analytics"
            className={({ isActive }) =>
              isActive ? "admin-dashboard__nav-link active" : "admin-dashboard__nav-link"
            }
          >
            Analytics
          </NavLink>

          <NavLink
            to="logins"
            className={({ isActive }) =>
              isActive ? "admin-dashboard__nav-link active" : "admin-dashboard__nav-link"
            }
          >
            Logins
          </NavLink>

          <NavLink
            to="data"
            className={({ isActive }) =>
              isActive ? "admin-dashboard__nav-link active" : "admin-dashboard__nav-link"
            }
          >
            User Data
          </NavLink>

          <NavLink
            to="feedbacks"
            className={({ isActive }) =>
              isActive ? "admin-dashboard__nav-link active" : "admin-dashboard__nav-link"
            }
          >
            Feedbacks
          </NavLink>

          <NavLink
            to="register"
            className={({ isActive }) =>
              isActive ? "admin-dashboard__nav-link active" : "admin-dashboard__nav-link"
            }
          >
            Register Admin
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="admin-dashboard__main">
        <Routes>
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="logins" element={<AdminLogins />} />
          <Route path="data" element={<AdminData />} />
          <Route path="feedbacks" element={<AdminFeedbacks />} />
          <Route path="register" element={<AdminRegistration />} />
          <Route
            path="/"
            element={
              <div className="admin-dashboard__placeholder">
                <p>Select a section from the sidebar</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
