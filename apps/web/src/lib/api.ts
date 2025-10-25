import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: (data: { email: string; name: string; password: string; university?: string }) =>
    api.post('/auth/register', data),
  
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  verifyEmail: (token: string) =>
    api.post('/auth/verify-email', { token }),
};

// Users API
export const usersApi = {
  getMe: () => api.get('/users/me'),
  
  updateMe: (data: Partial<{ name: string; university: string }>) =>
    api.put('/users/me', data),
  
  getProfile: (userId: string) =>
    api.get(`/users/${userId}/profile`),
};

// Universities API
export const universitiesApi = {
  list: (params?: { city?: string; search?: string }) =>
    api.get('/universities', { params }),
  
  getDepartments: (universityId: string) =>
    api.get(`/universities/${universityId}/departments`),
  
  getCourses: (departmentId: string) =>
    api.get(`/departments/${departmentId}/courses`),
};

// Notes API
export const notesApi = {
  list: (params?: {
    page?: number;
    limit?: number;
    university?: string;
    course?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  }) => api.get('/notes', { params }),
  
  getById: (noteId: string) =>
    api.get(`/notes/${noteId}`),
  
  create: (formData: FormData) =>
    api.post('/notes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  update: (noteId: string, data: Partial<{ title: string; description: string; price: number }>) =>
    api.put(`/notes/${noteId}`, data),
  
  delete: (noteId: string) =>
    api.delete(`/notes/${noteId}`),
  
  myNotes: () =>
    api.get('/notes/me'),
};

// Purchases API
export const purchasesApi = {
  create: (noteId: string, paymentProvider: string = 'iyzico') =>
    api.post('/purchases', { noteId, paymentProvider }),
  
  getById: (purchaseId: string) =>
    api.get(`/purchases/${purchaseId}`),
  
  myPurchases: () =>
    api.get('/purchases/me'),
  
  verifyAccess: (accessToken: string) =>
    api.get(`/purchases/verify/${accessToken}`),
};

// Reviews API
export const reviewsApi = {
  create: (noteId: string, rating: number, comment?: string) =>
    api.post(`/notes/${noteId}/reviews`, { rating, comment }),
  
  update: (reviewId: string, rating: number, comment?: string) =>
    api.put(`/reviews/${reviewId}`, { rating, comment }),
  
  delete: (reviewId: string) =>
    api.delete(`/reviews/${reviewId}`),
};

// Admin API
export const adminApi = {
  getPendingNotes: (params?: { page?: number; limit?: number }) =>
    api.get('/admin/notes', { params: { ...params, status: 'PENDING' } }),
  
  approveNote: (noteId: string) =>
    api.post(`/admin/notes/${noteId}/approve`),
  
  rejectNote: (noteId: string, reason: string) =>
    api.post(`/admin/notes/${noteId}/reject`, { reason }),
  
  getStats: () =>
    api.get('/admin/stats'),
};
