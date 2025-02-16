import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Correct import for React Router v6

export const AuthContext = createContext();

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// Add a request interceptor
API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data === false) {
          console.warn("Token expired. Logging out...");
          localStorage.clear();
          return Promise.reject({ response: { status: 401, message: "Token expired" } });
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Token validation error:", error);
        localStorage.clear();
        return Promise.reject({ response: { status: 401, message: "Token validation failed" } });
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check token validity on load
    const token = localStorage.getItem("authToken");

    if (token) {
      API.get("/api/auth/validate-token")
        .then((response) => {
          if (!response.data) {
            console.warn("Token expired. Logging out...");
            window.location.href = "/alpha-x"
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.error("Token validation failed. Logging out...");
            window.location.href = "/alpha-x"
          }
        });
    }
  }, [authToken]);

  const login = async ({ username, password }) => {
    try {
      const response = await API.post("/public/login", { username, password });
      const { token, employee } = response.data;

      // Save token and user details in state and localStorage
      setAuthToken(token);
      setEmployee(employee);
      localStorage.setItem("authToken", token);
      localStorage.setItem("employee", JSON.stringify(employee));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setAuthToken(null);
    setEmployee(null);
    setUserRole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("employee");
    localStorage.removeItem("userRole");
    navigate("/alpha-x"); // Redirect using React Router instead of window.location
  };

  return (
    <AuthContext.Provider value={{ employee, authToken, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
