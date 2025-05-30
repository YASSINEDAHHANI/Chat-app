import axios from 'axios';

const api = axios.create({
  //baseURL: '/api',
  baseURL: 'http://localhost:5000/',
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export default api;
