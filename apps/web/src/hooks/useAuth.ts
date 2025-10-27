// KARGANOT MVP Build - by Onur & Copilot
// Auth Hook

import { useState, useEffect, useCallback } from 'react';
import api, { ApiResponse } from '@/utils/api';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'FREE' | 'PREMIUM';
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * useAuth - Authentication state and actions
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');

    if (userStr && accessToken) {
      const user = JSON.parse(userStr);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  /**
   * Register new user
   */
  const register = useCallback(async (data: {
    email: string;
    password: string;
    name: string;
    universityId?: string;
    facultyId?: string;
    departmentId?: string;
  }) => {
    try {
      const response = await api.post<ApiResponse>('/v1/auth/register', data);
      
      if (response.data.success && response.data.data) {
        const { user, accessToken, refreshToken } = response.data.data;
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true, user };
      }
      
      throw new Error(response.data.message || 'Kayıt başarısız');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kayıt başarısız';
      return { success: false, error: message };
    }
  }, []);

  /**
   * Login user
   */
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post<ApiResponse>('/v1/auth/login', {
        email,
        password,
      });

      if (response.data.success && response.data.data) {
        const { user, accessToken, refreshToken } = response.data.data;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true, user };
      }

      throw new Error(response.data.message || 'Giriş başarısız');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Giriş başarısız';
      return { success: false, error: message };
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await api.post('/v1/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  return {
    ...state,
    register,
    login,
    logout,
  };
}
