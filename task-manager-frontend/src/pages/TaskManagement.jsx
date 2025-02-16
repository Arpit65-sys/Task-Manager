import React, { useEffect, useState } from "react";
import { getAllTasks, deleteTask, getTaskById, createTask, updateTask } from "../api/taskApi";
import "../styles/pages/taskbar.css";

const TaskBar = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTaskId, setSearchTaskId] = useState(""); 
  const [searchedTask, setSearchedTask] = useState(null);
  const [error, setError] = useState("");

  // State for creating a task
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [taskStatus, setTaskStatus] = useState("Not Started"); 

    // State for updating a task
    const [updateTaskId, setUpdateTaskId] = useState("");
    const [updateTaskData, setUpdateTaskData] = useState({
      taskName: "",
      taskDetails: "",
      taskStatus: "Not Started",
    });

    //State for deletion of task 
    const [deleteTaskId, setDeleteTaskId] = useState("");
    const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const data = await getAllTasks(authToken);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleDeleteTask = async () => {
    try {
      if (!deleteTaskId) {
        setMessage("Please enter a task ID to delete.");
        return;
      }
      const authToken = localStorage.getItem("authToken");
      await deleteTask(deleteTaskId, authToken);
      setMessage("Task deleted successfully, Refresh page !!");
      setDeleteTaskId("");
    } catch (error) {
      setMessage("Error deleting task. Please try again.");
    }
  };


  const handleSearch = async () => {
    try {
      setError(""); 
      if (!searchTaskId) {
        setError("Please enter a task ID to search.");
        return;
      }
      const authToken = localStorage.getItem("authToken");
      const task = await getTaskById(searchTaskId, authToken);
      setSearchedTask(task);
    } catch (error) {
      setError("Task not found or invalid ID.");
      setSearchedTask(null);
    }
  };

  const handleCreateTask = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const newTask = { taskName, taskDetails, taskStatus };

      const createdTask = await createTask(newTask, authToken);
      setTasks([...tasks, createdTask]);

      setTaskName("");
      setTaskDetails("");
      setTaskStatus("Not Started");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      if (!updateTaskId) {
        setError("Please enter a task ID to update.");
        return;
      }
      const authToken = localStorage.getItem("authToken");
      await updateTask(updateTaskId, updateTaskData, authToken);
      setUpdateTaskId("");
      setUpdateTaskData({ taskName: "", taskDetails: "", taskStatus: "Not Started" });
      window.location.reload();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Task Management</h2>

      {/* Search Task & Delete by ID */}
      <div className="row border rounded mb-4">
        <div className="col-md-6 p-3">
          <div className="d-flex align-items-center">
            <label className="me-2 fw-bold">Find Task by ID:</label>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter Task ID..."
              value={searchTaskId}
              onChange={(e) => setSearchTaskId(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          {error && <p className="text-danger">{error}</p>}
        </div>

        <div className="col-md-6 p-3">
          <div className="d-flex align-items-center">
            <label className="me-2 fw-bold">Delete Task by ID:</label>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter Task ID..."
              value={deleteTaskId}
              onChange={(e) => setDeleteTaskId(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
            <button className="btn btn-danger" onClick={handleDeleteTask}>
              Delete Task
            </button>
          </div>
          {message && <p className="text-danger">{message}</p>}
        </div>
      </div>

      {/* Display Searched Task Above Task Creation */}
      {searchedTask && (
        <div className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{searchedTask.taskName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Task ID: {searchedTask.taskId.timestamp}
            </h6>
            <p className="card-text">{searchedTask.taskDetails}</p>
            <p className={`badge ${searchedTask.taskStatus === "Completed" ? "bg-success" : searchedTask.taskStatus === "In Progress" ? "bg-warning" : "bg-danger"}`}>
              {searchedTask.taskStatus}
            </p>
            <p className="text-muted">
              Due Date: {new Date(...searchedTask.dueDate).toLocaleString()}
            </p>
          </div>
        </div>
      )}


      {/* Task Creation & Updation */}
      <div className="row border rounded mb-4">
        <div className="col-md-6 p-3">
          <h4>Create a New Task</h4>
            <input
              type="text"
              className="form-control mb-2"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name..."
            />

            <textarea
              className="form-control mb-2 set-details"
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              placeholder="Enter task details..."
            />

          <div className="mb-3">
            <h6>Task Status:</h6>
            <div>
              <label className="me-3">
                <input
                  type="radio"
                  name="taskStatus"
                  value="Not Started"
                  checked={taskStatus === "Not Started"}
                  onChange={(e) => setTaskStatus(e.target.value)}
                />
                <span className="ms-2 text-danger">Not Started</span>
              </label>
              <label className="me-3">
                <input
                  type="radio"
                  name="taskStatus"
                  value="In Progress"
                  checked={taskStatus === "In Progress"}
                  onChange={(e) => setTaskStatus(e.target.value)}
                />
                <span className="ms-2 text-warning">In Progress</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="taskStatus"
                  value="Completed"
                  checked={taskStatus === "Completed"}
                  onChange={(e) => setTaskStatus(e.target.value)}
                />
                <span className="ms-2 text-success">Completed</span>
              </label>
            </div>
          </div>

          <button className="btn btn-success" onClick={handleCreateTask}>
            Create Task
          </button>
        </div>

        <div className="col-md-6 p-3">
          <h4>Update Task</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Task ID"
            value={updateTaskId}
            onChange={(e) => setUpdateTaskId(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="New Task Name"
            value={updateTaskData.taskName}
            onChange={(e) => setUpdateTaskData({ ...updateTaskData, taskName: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="New Task Details"
            value={updateTaskData.taskDetails}
            onChange={(e) => setUpdateTaskData({ ...updateTaskData, taskDetails: e.target.value })}
          />
          <h6>Status:</h6>
          <div className="mb-3">
            {["Not Started", "In Progress", "Completed"].map((status) => (
              <label key={status} className="me-3">
                <input
                  type="radio"
                  name="updateTaskStatus"
                  value={status}
                  checked={updateTaskData.taskStatus === status}
                  onChange={(e) => setUpdateTaskData({ ...updateTaskData, taskStatus: e.target.value })}
                />{" "}
                {status}
              </label>
            ))}
          </div>
          <button className="btn btn-primary" onClick={handleUpdateTask}>
            Update Task
          </button>
        </div>
      </div>

      {/* Display All Tasks */}
      <div className="row">
        {tasks.map((task) => (
          <div key={task.taskId.timestamp} className="col-md-4">
            <div className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{task.taskName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Task ID: {task.taskId.timestamp}
                </h6>
                <p className="card-text">{task.taskDetails}</p>
                <p className={`badge ${task.taskStatus === "Completed" ? "bg-success" : task.taskStatus === "In Progress" ? "bg-warning" : "bg-danger"}`}>
                  {task.taskStatus}
                </p>
                <p className="text-muted">
                  Due Date: {new Date(...task.dueDate).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBar;
