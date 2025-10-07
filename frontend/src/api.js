import axios from "axios";

// ==============================
// Backend URL Configuration
// ==============================
export const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000";

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// ==============================
// Test Backend Connection
// ==============================
export const testBackend = async () => {
  try {
    const response = await apiClient.get("/api/test");
    return response.data;
  } catch (error) {
    console.error("Error connecting to backend:", error.response || error.message);
    return { error: "Failed to connect to backend" };
  }
};

// ==============================
// Predict API Call
// ==============================
export const predictPlacement = async (features) => {
  try {
    const response = await apiClient.post("/api/predict/predict", features);
    return response.data;
  } catch (error) {
    console.error("Prediction API error:", error.response || error.message);
    return { error: "Prediction failed" };
  }
};

// ==============================
// Recommend API Call
// ==============================
export const recommend = async (inputData) => {
  try {
    const response = await apiClient.post("/api/recommend/recommend", inputData);
    return response.data;
  } catch (error) {
    console.error("Recommendation error:", error.response || error.message);
    return { error: "Recommendation failed" };
  }
};

// ==============================
// Auth APIs
// ==============================
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response || error.message);
    return { error: "Registration failed" };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await apiClient.post("/api/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error.message);
    return { error: "Login failed" };
  }
};
