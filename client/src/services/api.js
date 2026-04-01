import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('khel_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Games
export const gamesAPI = {
  list: (params) => api.get('/games', { params }),
  get: (id) => api.get(`/games/${id}`),
  create: (data) => api.post('/games', data),
  update: (id, data) => api.put(`/games/${id}`, data),
  delete: (id) => api.delete(`/games/${id}`),
};

// AI Generation
export const generateAPI = {
  create: (data) => api.post('/generate', data),
};

// Sessions
export const sessionsAPI = {
  start: (data) => api.post('/sessions', data),
  respond: (id, data) => api.post(`/sessions/${id}/respond`, data),
  complete: (id) => api.post(`/sessions/${id}/complete`),
  childHistory: (childId) => api.get(`/sessions/child/${childId}`),
};

// Curriculum
export const curriculumAPI = {
  list: (params) => api.get('/curriculum', { params }),
  search: (q) => api.get('/curriculum/search', { params: { q } }),
};

// Leaderboards
export const leaderboardsAPI = {
  get: (gameId) => api.get(`/leaderboards/${gameId}`),
  submit: (gameId, data) => api.post(`/leaderboards/${gameId}`, data),
  global: () => api.get('/leaderboards/global/top'),
};

// Analytics
export const analyticsAPI = {
  progress: (childId) => api.get(`/analytics/child/${childId}/progress`),
  learningGaps: (childId) => api.get(`/analytics/child/${childId}/learning-gaps`),
  recommendations: (childId) => api.get(`/analytics/child/${childId}/recommendations`),
};

// Teacher
export const teacherAPI = {
  listClassrooms: () => api.get('/teacher/classrooms'),
  getClassroom: (id) => api.get(`/teacher/classrooms/${id}`),
  createClassroom: (data) => api.post('/teacher/classrooms', data),
  addStudent: (id, data) => api.post(`/teacher/classrooms/${id}/students`, data),
  removeStudent: (id, studentId) => api.delete(`/teacher/classrooms/${id}/students/${studentId}`),
  assignGame: (id, gameId) => api.post(`/teacher/classrooms/${id}/games`, { gameId }),
  classAnalytics: (id) => api.get(`/teacher/classrooms/${id}/analytics`),
};

export default api;
