import axios from 'axios';
import { User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

interface RegisterResponse {
  message: string;
  token: string;
  user: User;
}

export const authService = {
  // Register new user
  register: async (name: string, email: string, password: string, phone?: string): Promise<RegisterResponse> => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      phone
    });
    return response.data;
  },

  // Login user
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    return response.data;
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data.user;
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/auth/profile', userData);
    return response.data.user;
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.put('/auth/change-password', {
      currentPassword,
      newPassword
    });
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    }
  },

  // Check if email exists
  checkEmail: async (email: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/check-email', { email });
      return response.data.exists;
    } catch (error) {
      return false;
    }
  }
};

export default api;
