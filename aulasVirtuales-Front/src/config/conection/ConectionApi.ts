import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 INTERCEPTOR GLOBAL
api.interceptors.request.use((config) => {
  console.log("🔥 INTERCEPTOR EJECUTADO");

  const moodle = sessionStorage.getItem("moodle");
  console.log("moodle", moodle)

  if (moodle) {
    const parsed = JSON.parse(moodle);

    console.log("📦 MOODLE CONFIG:", parsed);

    config.headers["X-Moodle-BaseUrl"] = parsed.baseUrl;
    config.headers["X-Moodle-Sesskey"] = parsed.sesskey;
    config.headers["X-Moodle-Cookie"] = parsed.cookie;
  } else {
    console.log("❌ NO HAY MOODLE EN SESSION");
  }

  console.log("📡 HEADERS FINALES:", config.headers);

  return config;
});