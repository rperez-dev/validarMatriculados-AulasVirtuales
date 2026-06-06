import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 INTERCEPTOR GLOBAL
api.interceptors.request.use((config) => {
  const moodle = sessionStorage.getItem("moodle");

  if (moodle) {
    try {
      const parsed = JSON.parse(moodle);

      config.headers["X-Moodle-BaseUrl"] = parsed.baseUrl;
      config.headers["X-Moodle-Sesskey"] = parsed.sesskey;
      config.headers["X-Moodle-Cookie"] = parsed.cookie;
    } catch (e) {
      console.error("Moodle parse error", e);
    }
  }

  return config;
});
// api.interceptors.request.use((config) => {
//   console.log("🔥 INTERCEPTOR EJECUTADO");

//   const moodle = sessionStorage.getItem("moodle");
//   console.log("moodle", moodle);

//   if (moodle) {
//     const parsed = JSON.parse(moodle);

//     console.log("📦 MOODLE CONFIG:", parsed);

//     config.headers["X-Moodle-BaseUrl"] = parsed.baseUrl;
//     config.headers["X-Moodle-Sesskey"] = parsed.sesskey;
//     config.headers["X-Moodle-Cookie"] = parsed.cookie;
//   } else {
//     console.log("❌ NO HAY MOODLE EN SESSION");
//   }

//   console.log("📡 HEADERS FINALES:", config.headers);

//   return config;
// });
