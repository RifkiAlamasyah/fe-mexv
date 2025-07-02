import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6960",
});

// Request interceptor - add Bearer token
api.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Fixed: Add Bearer prefix
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor - handle token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Only handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("masuk")
      originalRequest._retry = true;

      // Case 1: Token expired - try to get new token using current token as refresh token
      if (error.response.data?.error === "Token expired") {
        try {
          const currentToken = sessionStorage.getItem("token");
          
          if (!currentToken) {
            throw new Error("No token available");
          }
          
          // Try to refresh using the current token
          const res = await axios.post(`${api.defaults.baseURL}/api/login`, {
            token: currentToken
          });

          if (res.data.token) {
            const newToken = res.data.token;
            sessionStorage.setItem("token", newToken);
            
            // Update the header for retry
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error("Refresh failed:", refreshError);
        }
      }
      
      // Case 2: Any 401 error - clear storage and redirect
      sessionStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(error);
    }



    return Promise.reject(error);
  }
);

export default api;