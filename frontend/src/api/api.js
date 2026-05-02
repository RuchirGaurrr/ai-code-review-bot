import axios from "axios"

const API_BASE_URL = "https://ai-code-review-bot-backend.onrender.com"

export const getCodeReview = async (code) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/review/`,
      {
        code,
        language: "auto",
      },
      {
        timeout: 60000, // 60 seconds timeout
      }
    )
    return response.data

  } catch (error) {
    // Timeout
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out. The server might be waking up — please try again!")
    }
    // Network error — backend not reachable
    if (!error.response) {
      throw new Error("Cannot reach the server. Please check your internet connection!")
    }
    // Rate limit hit
    if (error.response.status === 429) {
      throw new Error("Too many requests! Please wait a moment and try again.")
    }
    // Server error
    if (error.response.status === 500) {
      throw new Error("Server error. Please try again in a moment!")
    }
    // Generic fallback
    throw new Error("Something went wrong. Please try again!")
  }
}