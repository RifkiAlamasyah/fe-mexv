import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true // ⬅️ WAJIB UNTUK COOKIE
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================
api.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ==============================
// RESPONSE INTERCEPTOR
// ==============================
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // ⛔ JANGAN HANDLE 401 DARI SESSION CHECK
    if (originalRequest.url.includes("/auth/session")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔑 TANYA BACKEND: SESSION MASIH ADA?
        const res = await api.get("/auth/session");

        if (res.data.loggedIn) {
          const newToken = res.data.token;

          // simpan ulang bearer
          sessionStorage.setItem("token", newToken);
          api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

          // retry request awal
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (e) {
        // session memang sudah mati
      }

      // 🔥 SESSION MATI TOTAL
      sessionStorage.removeItem("token");
      delete api.defaults.headers.common.Authorization;
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
