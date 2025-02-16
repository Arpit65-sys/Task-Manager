import axios from "axios";

const EMPLOYEE_BASE_URL = "http://localhost:8080/employee";

export const getEmployeeById = async (empId) => {
  try {
    const authToken = localStorage.getItem("authToken"); // Retrieve token from local storage
    if (!authToken) {
      throw new Error("User is not authenticated. Please log in.");
    }

    const response = await axios.get(
      `${EMPLOYEE_BASE_URL}/read-employee/${empId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Attach JWT token
        },
        withCredentials: true, // Important for CORS authentication
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};

export const updateEmployee = async (updateData, authToken) => {
  try {
    const response = await axios.put(
      `${EMPLOYEE_BASE_URL}/update-employee`,
      updateData, // Pass updateData as the request body
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Attach JWT token
          "Content-Type": "application/json", // Ensure JSON format
        },
        withCredentials: true, // Ensures cookies are included if needed
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};


export const deleteEmployee = async (authToken) => {
  try {
    const response = await axios.delete(
      `${EMPLOYEE_BASE_URL}/delete-employee`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Attach JWT token
        },
        withCredentials: true, // Ensures cookies are included if needed
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
