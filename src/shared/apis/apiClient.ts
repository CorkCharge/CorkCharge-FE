import axios from 'axios';
import { PAGE_TO_ANYONE } from '../constants/Routes';

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

let isRefreshing = false; // 리프레시 토큰 갱신 중
let pendingRequests: ((token: string) => void)[] = []; // 갱신 중 들어오는 추가요청은 큐잉처리

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalReq._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token: string) => {
            originalReq.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalReq));
          });
        });
      }

      originalReq._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/oauth/reissue`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const { accessToken: newAccToken } = res.data.data;
        sessionStorage.setItem('accessToken', newAccToken);
        pendingRequests.forEach((cb) => cb(newAccToken));
        pendingRequests = [];
        isRefreshing = false;

        originalReq.headers.Authorization = `Bearer ${newAccToken}`;
        return apiClient(originalReq);
      } catch (e) {
        console.log('리프레시 토큰이 만료되었습니다 : ' + e);
        isRefreshing = false;
        pendingRequests = [];
        sessionStorage.clear();
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
