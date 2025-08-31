import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const profileAPI = {
  // Get profile
  getProfile: () => api.get('/profile'),
  
  // Create or update profile
  createProfile: (profileData) => api.post('/profile', profileData),
  
  // Get projects with optional skill filter
  getProjects: (skill = '') => {
    const params = skill ? { skill } : {};
    return api.get('/projects', { params });
  },
  
  // Get top skills
  getTopSkills: () => api.get('/skills/top'),
  
  // Search projects/skills
  search: (query) => api.get('/search', { params: { q: query } }),
  
  // Health check
  healthCheck: () => api.get('/health'),
};

export default api;
