import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const moodle = sessionStorage.getItem("moodle");

  if (moodle) {
    try {
      const parsed = JSON.parse(moodle);

      config.headers["X-Moodle-BaseUrl"] = parsed.baseUrl;
      config.headers["X-Moodle-Sesskey"] = parsed.sesskey;
      config.headers["X-Moodle-Cookie"] = parsed.cookie;
    } catch (error) {
      console.error("Error parsing moodle session:", error);
    }
  }

  return config;
});