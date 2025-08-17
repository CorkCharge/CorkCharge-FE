import axios from 'axios';
import { PAGE_TO_ANYONE } from '../constants/NoneAuthFiles';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const accToken = sessionStorage.getItem('accessToken');
  if (accToken && !PAGE_TO_ANYONE.some((prefix) => config.url?.startsWith(prefix))) {
    config.headers.Authorization = `Bearer ${accToken}`;
  }

  return config;
});

// apiClient.interceptors.response.use(
//   (res) => res,
//   (error) => {}
// );

export default apiClient;
