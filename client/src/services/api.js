import axios from 'axios';

// Konfigurasi base URL. Saat development, ini akan di-proxy oleh Vite.
const API = axios.create({ baseURL: '/api' });

export const getPortfolio = () => API.get('/portfolio');
export const sendContactMessage = (formData) => API.post('/contact', formData);
