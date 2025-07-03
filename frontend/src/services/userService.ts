import axios from 'axios';
import { User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Update password
  updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.put('/users/password', {
      currentPassword,
      newPassword,
    });
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.avatarUrl;
  },

  // Delete account
  deleteAccount: async (): Promise<void> => {
    await api.delete('/users/profile');
  },

  // Get user statistics
  getUserStats: async (): Promise<{
    totalOrders: number;
    totalSpent: number;
    wishlistCount: number;
    reviewsCount: number;
  }> => {
    const response = await api.get('/users/stats');
    return response.data;
  },
};

export default userService;
