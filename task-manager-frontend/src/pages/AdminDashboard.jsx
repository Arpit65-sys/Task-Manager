import React, { useEffect, useState } from "react";
import { getAllEmployees, createAdmin, createEmployee } from "../api/adminApi";
import "../styles/pages/adminDashboard.css";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ employeeName: "", password: "" });
  const [employeeData, setEmployeeData] = useState({ employeeName: "", password: "", role: [] });
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        if (!authToken) {
          throw new Error("Authentication token is missing");
        }
        const data = await getAllEmployees(authToken);
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError(error.message);
      }
    };
    fetchEmployees();
  }, [authToken]);

  const handleCreateAdmin = async () => {
    try {
      await createAdmin(newAdmin, authToken);
      setShowModal(false);
      setNewAdmin({ employeeName: "", password: "" });
      window.location.reload();
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("Something went wrong. Try again with another username!");
    }
  };

  const handleCreateEmployee = async () => {
    try {
      await createEmployee(employeeData, authToken);
      setShowEmployeeModal(false);
      setEmployeeData({ employeeName: "", password: "", role: [] });
      window.location.reload();
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Something went wrong. Try again with another username!");
    }
  };

  return (
    <div className="mt-5 container">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Create New Admin
      </button>
      <button className="btn btn-success mb-3 ms-3" onClick={() => setShowEmployeeModal(true)}>
        Create New Employee
      </button>

      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered custom-table">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Roles</th>
                <th>Tasks</th>
                <th>Task Due Date</th>
                <th>Task Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.employeeId.timestamp}>
                    <td>{emp.employeeId.timestamp}</td>
                    <td>{emp.employeeName}</td>
                    <td>{emp.role.join(", ")}</td>
                    <td>
                      {emp.tasks.length > 0
                        ? emp.tasks.map((task) => task.taskName).join(", ")
                        : "No tasks assigned"}
                    </td>
                    <td>
                      {emp.tasks.length > 0
                        ? emp.tasks
                            .map((task) =>
                              new Date(
                                task.dueDate[0],
                                task.dueDate[1] - 1,
                                task.dueDate[2]
                              ).toLocaleDateString()
                            )
                            .join(", ")
                        : "No due dates"}
                    </td>
                    <td>
                      {emp.tasks.length > 0
                        ? emp.tasks.map((task) => task.taskStatus).join(", ")
                        : "No tasks assigned"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show d-block mt-5 pt-4" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Admin</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Employee Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAdmin.employeeName}
                    onChange={(e) => setNewAdmin({ ...newAdmin, employeeName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleCreateAdmin}>
                  Create Admin
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Modal */}
      {showEmployeeModal && (
        <div className="modal fade show d-block mt-5 pt-4" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Employee</h5>
                <button type="button" className="btn-close" onClick={() => setShowEmployeeModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Employee Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employeeData.employeeName}
                    onChange={(e) => setEmployeeData({ ...employeeData, employeeName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={employeeData.password}
                    onChange={(e) => setEmployeeData({ ...employeeData, password: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter roles comma-separated"
                    value={employeeData.role.join(", ")}
                    onChange={(e) => setEmployeeData({ ...employeeData, role: e.target.value.split(",").map(role => role.trim()) })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleCreateEmployee}>
                  Create Employee
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEmployeeModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
