import axios from "axios";

// Create an axios instance
export const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/v1", // use .env environment variable to get base URL
  timeout: 5000, // request timeout
});
