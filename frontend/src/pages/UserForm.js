import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserForm.css";

const API_URL = "http://127.0.0.1:5000/api/users/";

export default function UserForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data || []);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage("⚠️ Name and Email are required");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}${editId}`, formData);
        setMessage("✅ User updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        setMessage("✅ User added successfully!");
      }
      setFormData({ name: "", email: "" });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving user");
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditId(user._id || user.id);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_URL}${id}`);
      setMessage("🗑️ User deleted");
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error deleting user");
    }
  };

  return (
    <div className="user-form-container">
      <h2>👤 User Management</h2>

      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit" className={editId ? "edit-btn" : ""}>
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      <h3>📋 Users List</h3>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length > 0 ? (
        <ul className="user-list">
          {users.map((u) => (
            <li key={u._id || u.id}>
              <div className="user-info">
                <strong>{u.name}</strong>
                <span>{u.email}</span>
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(u)} className="edit">
                  ✏️
                </button>
                <button onClick={() => handleDelete(u._id || u.id)} className="delete">
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
