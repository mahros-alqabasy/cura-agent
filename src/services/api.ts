
import axios from 'axios';
import { toast } from '@/components/ui/sonner';

const BASE_URL = 'https://gu-his.up.railway.app';
const API_URL = `${BASE_URL}/api`;

// Create an axios instance with baseURL
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding the authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token available, must login again
          throw new Error("No refresh token available");
        }
        
        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
          refresh: refreshToken
        });
        
        if (response.data.access) {
          localStorage.setItem('token', response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return api(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        toast.error('Your session has expired. Please sign in again.');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login/', { email, password });
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  register: async (userData: any) => {
    try {
      const response = await api.post('/auth/register/', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await api.post('/auth/logout/');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local storage even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  verifyToken: async (token: string) => {
    try {
      const response = await api.post('/auth/token/verify/', { token });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Chat services
export const chatService = {
  sendMessage: async (prompt: string) => {
    try {
      const response = await api.post('/chat/send/', { prompt });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getHistory: async () => {
    try {
      const response = await api.get('/chat/history/');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
