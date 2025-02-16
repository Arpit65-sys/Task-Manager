import axios from "axios";

const PUBLIC_BASE_URL = "http://localhost:8080/public";

// Create Axios instance
const publicApi = axios.create({
  baseURL: PUBLIC_BASE_URL,
});

// Add an interceptor to include the token in all requests
publicApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const healthCheck = async () => {
  const response = await publicApi.get("/check-in");
  return response.data;
};

export const login = async (credentials) => {
  const response = await publicApi.post("/login", credentials);
  return response.data; // Contains the token and other user details
};
