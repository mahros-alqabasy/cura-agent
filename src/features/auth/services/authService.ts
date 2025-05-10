import axios from 'axios';
import { toast } from '@/components/ui/sonner';

const BASE_URL = 'https://gu-his.up.railway.app';
const API_URL = `${BASE_URL}/api`;

type LoginMethod = 'email' | 'nationalId' | 'phone';

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
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error("No refresh token available");
                const response = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh: refreshToken });
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

export const authService = {
    login: async (credential: string, password: string, method: LoginMethod = 'email') => {
        try {
            const payload: Record<string, string> = { password, method };
            payload[method] = credential;
            const response = await api.post('/auth/login/', payload);
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