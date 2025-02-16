import axios from "axios";

const TASK_BASE_URL = "http://localhost:8080/tasks";

export const getAllTasks = async (authToken) => {
  try {
    const response = await axios.get(
      `${TASK_BASE_URL}/read-all`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Attach JWT token  
        },
        withCredentials: true, // Ensures cookies are included if needed
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error getting employee:", error);
    throw error;
  }
};

export const createTask = async (taskData, authToken) => {
  try {
    const response = await axios.post(
      `${TASK_BASE_URL}/create-task`,
      taskData, // pass taskData as data in Body 
      {
        headers:{
          Authorization: `Bearer ${authToken}`, // Attach JWT token
          "Content-Type": "application/json", // Ensure JSON format
        },
        withCredentials: true, // Ensures cookies are included if needed
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in creating task:", error);
    throw error;
  }
};

export const getTaskById = async (taskId, authToken) => {
  try {
    const response = await axios.get(
      `${TASK_BASE_URL}/id/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Attach JWT token for authorization
        },
        withCredentials: true, // Ensures cookies are included if needed
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error exist in gettask by id", error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData, authToken) => {
  try {
    const response = await axios.put(
      `${TASK_BASE_URL}/id/${taskId}`,
      taskData, // pass taskData as data in Body
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Attach JWT token for authorization
          "Content-Type": "application/json", // Ensure JSON format
        },
        withCredentials: true, // Ensures cookies are included if needed
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error occured during task updation:", error);
    throw error;
  }
};

export const deleteTask = async (taskId, authToken) => {
  try {
    const response = await axios.delete(
      `${TASK_BASE_URL}/id/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Attach JWT token for authorization
        }, 
        withCredentials: true, // Ensures cookies are included if needed
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error occured during task updation:", error);
    throw error;    
  }
};
