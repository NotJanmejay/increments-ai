import React, { useState } from "react";
import axios from "axios"; // Import Axios for API requests
import "../styles/LoginStyle.css";
import { useNavigate } from "react-router-dom";

const StudentLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/students/login/",
        credentials,
      );
      console.log("Login successful:", response.data);

      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
      } else {
        sessionStorage.setItem("token", response.data.token);
      }

      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/student");
      }, 1000);
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      setError(
        error.response?.data?.detail || "Login failed. Please try again.",
      );
    }
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div>
      {/* Header Section */}
      <header id="login-header">
        <img src="/msbc-logo.png" alt="MSBC Logo" className="msbc-logo" />
        {/* <div onClick={() => navigate("/home")} style={{ cursor: "pointer", marginLeft: "30px", fontWeight: 400 }}>Home</div> Add Home button */}
      </header>

      {/* Login Form Section */}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Student Login</h2>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="options-container">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error if login fails */}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}{" "}
          {/* Display success message */}
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
