import React, { useState } from "react";
import axios from "axios";
import "../styles/popupForm.css"; // Ensure the correct CSS file is used

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      employeeName: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/public/login",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      const configData = JSON.parse(response.config.data);
      console.log("Login successful:", response.data.accessToken);
      console.log("ROLE: ", response.data.role);

      const token = response.data.accessToken;
      const employeeName = configData.employeeName;
      const userRole = response.data.role;

      localStorage.setItem("authToken", token);
      localStorage.setItem("employee", employeeName);
      localStorage.setItem("userRole", userRole);

      window.location.href = "/alpha-x";
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrorMessage(error.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h3 className="login-title">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button className="btn-login" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
