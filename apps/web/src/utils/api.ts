// KARGANOT MVP Build - by Onur & Copilot
// Axios API Client

import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Axios instance with default config
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Single-flight refresh lock
let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

function processQueue(error: any, token: string | null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
}

/**
 * Request interceptor - attach access token
 */
api.interceptors.request.use(
  (config) => {
    // Eğer baseURL '/api' içermiyorsa ve istek '/v1' (veya bilinen internal path) ile başlıyorsa '/api' önekini ekle
    const needsApiPrefix = config.baseURL && !config.baseURL.includes('/api');
    if (config.url && needsApiPrefix && (config.url.startsWith('/v1') || config.url.startsWith('/documents'))) {
      config.url = `/api${config.url}`;
    }
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor - handle token refresh
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};

    // If 401 and not already retried, try refreshing token
    if (error.response?.status === 401 && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;

      if (isRefreshing) {
        // Queue the request until refresh completes
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            if (token) originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      try {
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await api.post('/v1/auth/refresh', { refreshToken });
        const newAccessToken: string | undefined = data?.data?.accessToken;
        if (!newAccessToken) throw new Error('Invalid refresh response');

        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', newAccessToken);
        }

        processQueue(null, newAccessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Refresh failed, logout user
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          toast.error('Oturum süreniz doldu. Lütfen tekrar giriş yapın.');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Global error feedback
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.error?.message || axiosError.message || 'Bir hata oluştu';
    if (axiosError.response?.status && axiosError.response.status >= 400) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;

/**
 * Type-safe API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}
