import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ContactPage from "./pages/ContactUs";
import About from "./pages/About";
import TaskBar from "./pages/TaskManagement";
import withAuth from "./components/ProtectedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ProtectedAdminDashboard = withAuth(AdminDashboard);
const ProtectedEmployeeDashboard = withAuth(EmployeeDashboard);
const ProtectedTaskBar = withAuth(TaskBar);

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminDashboard />} />
        <Route path="/dashboard" element={<ProtectedEmployeeDashboard />} />
        <Route path="/taskbar" element={<ProtectedTaskBar />} />
      </Routes>
    </>
  );
};

export default App;
