import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6960",  // ganti sesuai backend kamu
});

// Pasang token di setiap request (kalau ada)
api.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// Handle response error 401 (token expired)
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refresh_token");

      if (!refreshToken) {
        // Kalau gak ada refresh token, redirect ke login
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Kirim request refresh token
      try {
        const res = await axios.post("http://localhost:6960/api/refresh-token", {
          refresh_token: refreshToken,
        });

        const newToken = res.data.token;
        const newRefreshToken = res.data.refresh_token;

        // Simpan token baru ke sessionStorage
        sessionStorage.setItem("token", newToken);
        sessionStorage.setItem("refresh_token", newRefreshToken);

        // Update header authorization untuk request berikutnya
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Ulangi request yang gagal
        return api(originalRequest);
      } catch (err) {
        // Kalau refresh token gagal, logout dan redirect login
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
