// lib/axios.ts
import { apiUrl } from "@/config";
import useAuthStore from "@/stores/useAuthStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// This function is no longer needed, as we will interact with the store directly
// let accessToken: string | null = null;
// export const setAccessToken = (token: string | null) => { ... }

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Request Interceptor: Get the token from the Zustand store
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post("/api/auth/refresh-token");
        const accessToken = data.token;

        // Use the login action from the store to update the token everywhere
        useAuthStore.getState().setAccessToken(accessToken);

        // Update the header of the original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out the user
        useAuthStore.getState().logout();
        console.error("Session expired.");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
