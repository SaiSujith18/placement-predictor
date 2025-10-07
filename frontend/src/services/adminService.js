import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000";

export const adminLogin = async (credentials) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/admin/login`, credentials);
    return res.data;
  } catch (error) {
    console.error("Admin login error:", error.response || error.message);
    return { error: "Login failed" };
  }
};

export const fetchLogins = async (token) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/admin/logins`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Fetch logins error:", error);
    return [];
  }
};

export const fetchData = async (token) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/admin/data`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Fetch data error:", error);
    return [];
  }
};

export const fetchFeedbacks = async (token) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/admin/feedbacks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Fetch feedbacks error:", error);
    return [];
  }
};
