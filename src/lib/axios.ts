// lib/axios.ts
import { apiUrl } from "@/config";
import { useAuthStore } from "@/stores/useAuthStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Request Interceptor
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

// Token refresh promise to prevent multiple refresh calls
let isRefreshing = false;
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: Error | AxiosError) => void;
}

let failedQueue: Array<QueueItem> = [];

const processQueue = (
  error: Error | AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor with improved token refresh handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const authRoutes = [
      "/api/auth/login",
      "/api/auth/refresh-token",
      "/api/auth/register",
    ];

    // Only attempt refresh if we have a 401 and it's not already a retry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url &&
      !authRoutes.includes(originalRequest.url)
    ) {
      if (isRefreshing) {
        // If refresh is in progress, queue this request
        try {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const response = await api.get(`/api/auth/refresh-token`);

        const newToken = response.data.accessToken;

        if(!newToken) return;

        // Update store and axios defaults
        useAuthStore.getState().setAccessToken(newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        // Process queued requests
        processQueue(null, newToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        const refreshError =
          error instanceof Error ? error : new Error("Token refresh failed");

        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
