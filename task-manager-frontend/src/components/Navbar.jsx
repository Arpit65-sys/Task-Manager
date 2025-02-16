import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [employeeName, setEmployeeName] = useState("");
  const userRole = localStorage.getItem("userRole");
  
  const navbarRef = useRef(null); // Ref for the navbar collapse section

  const handleLogout = () => {
    logout();
    window.location.href = "/alpha-x"; // Redirect to login page after logout
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedEmployeeName = localStorage.getItem("employee");

    if (token && storedEmployeeName) {
      setEmployeeName(storedEmployeeName);
    }
  }, []);

  const handleDashboardClick = () => {
    if (!localStorage.getItem("authToken")) {
      window.alert("Please login to access the dashboard");
      window.location.href = "/alpha-x/login";
    } else if (userRole === "ADMIN") {
      window.location.href = "/alpha-x/admin/dashboard";
    } else {
      window.location.href = "/alpha-x/dashboard";
    }
    closeNavbar(); // Close navbar after navigating
  };

  const handleTaskClick = () => {
    if (!localStorage.getItem("authToken")) {
      window.alert("Please login to access the dashboard");
      window.location.href = "/alpha-x/login";
    } else {
      window.location.href = "/alpha-x/taskbar";
    }
    closeNavbar(); // Close navbar after navigating
  };

  // Function to close the navbar after clicking a link
  const closeNavbar = () => {
    if (navbarRef.current) {
      navbarRef.current.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fs-4 text-white" to="/alpha-x">
          Alpha-X
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup" ref={navbarRef}>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link text-white" to="/" onClick={closeNavbar}>
              Home
            </Link>
            <span className="nav-link text-white" onClick={handleDashboardClick} style={{ cursor: "pointer" }}>
              Dashboard
            </span>
            <Link className="nav-link text-white" onClick={handleTaskClick} style={{ cursor: "pointer" }}>
              Tasks
            </Link>
            <Link className="nav-link text-white" to="/about-us" onClick={closeNavbar}>
              About
            </Link>
            <Link className="nav-link text-white" to="/contact-us" onClick={closeNavbar}>
              Contact Us
            </Link>
          </div>
          <div className="divider">
            <hr />
          </div>
          <div className="login-setup d-flex align-items-center">
            {employeeName ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-light">Hi, {employeeName}</span>
                <button className="btn btn-danger btn-sm fs-6" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link className="btn btn-light btn-sm fs-6" to="/login" onClick={closeNavbar}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
  