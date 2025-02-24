import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
} from "../api/employeeApi";
import { Modal } from "bootstrap"; // Ensure correct import for Bootstrap modal
import "../styles/pages/employeeDashboard.css";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  const employee = localStorage.getItem("employee");

  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [updateMessage, setUpdateMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Add this state variable
  const [updateData, setUpdateData] = useState({
    employeeName: "",
    password: "",
    role: [],
  });

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  // Handle Fetch Employee Details
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^[a-fA-F0-9]{24}$/.test(employeeId)) {
      setErrorMessage(
        "Invalid Employee ID format. Please enter a valid 24-character MongoDB ObjectId."
      );
      showErrorModal();
      return;
    }

    try {
      const response = await getEmployeeById(employeeId.trim());
      setEmployeeDetails(response);

      // Show Employee Details Modal
      const modalElement = document.getElementById("employeeModal");
      const modal = new Modal(modalElement);
      modal.show();
    } catch (error) {
      setEmployeeDetails(null);
      setErrorMessage(
        "You have entered wrong employee's details or login expired, refresh page"
      );
      showErrorModal();
    }
  };

  // Function to Show Error Modal
  const showErrorModal = () => {
    const modalElement = document.getElementById("errorModal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  // Handle Employee Deletion
  const handleDeletion = async (event) => {
    event.preventDefault();

    const isConfirmed = window.confirm(
      "Are you sure!!! this action is undone once done.......!!!"
    );
    if (!isConfirmed) return; // Stop execution if the user cancels

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    try {
      await deleteEmployee(authToken); // Call API to delete user
      localStorage.removeItem("authToken");
      localStorage.removeItem("employee");
      localStorage.removeItem("userRole");
      localStorage.clear(); // Clear all user data from local storage

      alert("Account has been deleted."); // Show final alert

      window.location.href = "/alpha-x"; // Redirect to homepage
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Something went wrong. Please try again.");
      window.location.href = "/alpha-x"; // Redirect to homepage
    }
  };

  // Handle Employee Update
  const handleUpdate = async (event) => {
    event.preventDefault();

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    try {
      const response = await updateEmployee(updateData, authToken); // Ensure the authToken is passed
      setUpdateMessage(response); // Set the message to be shown in the modal

      // Show the modal with the update message
      const modalElement = document.getElementById("updateModal");
      const modal = new Modal(modalElement, {
        backdrop: "static",
        keyboard: false,
      });
      modal.show();

      // Redirect to home page after modal close
      modalElement.addEventListener("hidden.bs.modal", () => {
        localStorage.clear(); // remove previous credential
        window.location.href = "/alpha-x"; // Redirect to homepage
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Something went wrong. Please try again.");
      window.location.href = "/alpha-x"; // Redirect to homepage
    }
  };

  return (
    <div className="container">
      <div className="card details-panel shadow-lg p-4 bg-light">
        <h2 className="text-center text-primary">Welcome, {employee}</h2>

        {/* Fetch Employee Details */}
        <form onSubmit={handleSubmit} className="">
          <div className="mb-3">
            <label htmlFor="employeeId" className="form-label fw-bold">
              1. Enter Employee ID to View Details
            </label>
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-8">
                <input
                  type="text"
                  className="form-control border-primary"
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                  placeholder="Enter 24-character Employee ID"
                />
              </div>
              <div className="col-4 text-end">
                <button type="submit" className="btn btn-primary">
                  Check Details
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Error Modal */}
        <div className="modal fade" id="errorModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Error</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-danger">{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Employee */}
        <form onSubmit={handleDeletion} className="mt-4">
          <div className="mb-3">
            <div className="row d-flex align-items-center">
              <div className="col-8">
                <label className="fw-bold">
                  2. Enter Employee ID to Delete
                </label>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <button
                  type="submit"
                  className="ml-auto text-end btn btn-danger"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Update Employee Details */}
        <form onSubmit={handleUpdate} className="mt-4">
          <div>
            <label className="form-label fw-bold">
              3. Update Employee Information
            </label>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Employee Name"
                  value={updateData.employeeName}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      employeeName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-6">
                <input
                  type="password"
                  className="form-control mt-2"
                  placeholder="Password"
                  value={updateData.password}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Enter mail Id"
                  value={updateData.mailId}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, mailId: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Enter Contact Number"
                  value={updateData.phoneNumber}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Roles (comma-separated)"
                  value={updateData.role.join(", ")}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      role: e.target.value.split(","),
                    })
                  }
                  required
                />
              </div>
              <div className="col-6 position-relative">
                <select
                  className="form-select mt-2"
                  value={updateData.gender}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, gender: e.target.value })
                  }
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <i
                  className="bi bi-caret-down-fill position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                ></i>
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-2">
              Update
            </button>
          </div>
        </form>
      </div>

      {/* Employee Details Modal */}
      <div className="modal fade" id="employeeModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Employee Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {employeeDetails ? (
                <>
                  <p>
                    <strong>Name:</strong> {employeeDetails.employeeName}
                  </p>
                  <p>
                    <strong>Email-Id:</strong> {employeeDetails.mailId}
                  </p>
                  <p>
                    <strong>Contact No:</strong> {employeeDetails.phoneNumber}
                  </p>
                  <p>
                    <strong>Role:</strong> {employeeDetails.role?.join(", ")}
                  </p>
                  <p>
                    <strong>Gender:</strong> {employeeDetails.gender}
                  </p>
                </>
              ) : (
                <p className="text-danger">No employee details found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Update Confirmation Modal */}
      <div className="modal fade" id="updateModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Status</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">{updateMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
