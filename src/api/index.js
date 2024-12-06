import axios from "axios";
import { tmdbApiKey } from "config";

// Create the Axios instance
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 10000,
  params: {
    language: "en-US",
  },
});

// Add the API key to headers using an interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${tmdbApiKey}`; // Pass API key in headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
