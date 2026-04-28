import axios from "axios";

// Base URL of our FastAPI backend
const API_BASE_URL = "http://localhost:8000";

// Function to send code to FastAPI and get AI review
export const getCodeReview = async (code) => {
  const response = await axios.post(`${API_BASE_URL}/review/`, {
    code,
    language: "auto",
  });
  return response.data;
};