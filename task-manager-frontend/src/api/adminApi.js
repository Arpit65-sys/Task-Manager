import axios from "axios";

const ADMIN_BASE_URL = "http://localhost:8080/admin";

export const getAllEmployees = async (authToken) => {
  try {
    const response = await axios.get(
      `${ADMIN_BASE_URL}/all-employees`,
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

export const createAdmin = async (newAdmin, authToken) => {  
  try {
    const response = await axios.post(
      `${ADMIN_BASE_URL}/create-admin`,
      JSON.stringify(newAdmin), // Ensure body is JSON
      {
        headers: {
          Authorization: `Bearer ${authToken.trim()}`, // Ensure no extra spaces
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensures cookies are included if needed
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating admin:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};



export const createEmployee = async (employeeData, authToken) => {
  try {
    const response = await axios.post(
      `${ADMIN_BASE_URL}/signup`,
      JSON.stringify(employeeData),
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Attach JWT token
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating Employee:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
