import axios from 'axios';
import useMyPageStore from '../store/useMyPageStore';
import useAuthStore from '../store/useAuthStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const accToken = sessionStorage.getItem('accessToken');
    if (accToken) {
      config.headers.Authorization = `Bearer ${accToken}`;
      console.log(
        '%c🔑 [Access Token (Copy for Postman)]:',
        'color: #00bcd4; font-weight: bold;',
        accToken
      ); // 추후 삭제
    }

    // 🔥 [디버깅용 로그] 어떤 요청을 보내는지 확인
    console.group(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
    console.log('🔗 URL:', config.baseURL ? config.baseURL + config.url : config.url);
    console.log('📦 Headers:', config.headers);
    console.log('📦 Params (Query):', config.params); // GET 요청의 파라미터
    console.log('📦 Body (Data):', config.data); // POST/PUT 요청의 데이터
    console.groupEnd();

    return config;
  },
  (error) => {
    console.error('❌ [API Request Error]:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // 🔥 [디버깅용 로그] 서버가 어떤 응답을 줬는지 확인
    console.group(
      `✅ [API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`
    );
    console.log('🔢 Status:', response.status);
    console.log('📦 Data:', response.data); // 실제 서버가 준 응답 내용
    console.groupEnd();

    return response;
  },
  (error) => {
    // 🔥 [디버깅용 로그] 에러가 났을 때 확인
    if (error.response) {
      // 서버가 응답을 줬으나, 상태 코드가 2xx가 아님 (400, 401, 500 등)
      console.group(
        `🚨 [API Error Response] ${error.config?.method?.toUpperCase()} ${error.config?.url}`
      );
      console.log('🔢 Status:', error.response.status);
      console.log('📦 Error Data:', error.response.data); // 서버가 보낸 에러 메시지
      console.groupEnd();
    } else if (error.request) {
      // 요청은 보냈으나 응답을 못 받음 (네트워크 문제 등)
      console.error('🚨 [API No Response]:', error.request);
    } else {
      // 요청 설정 중 오류 발생
      console.error('🚨 [API Setup Error]:', error.message);
    }
    return Promise.reject(error);
  }
);

let isRefreshing = false; // 리프레시 토큰 갱신 중
let pendingRequests: ((_token: string | null) => void)[] = []; // 갱신 중 들어오는 추가요청은 큐잉처리
let isRedirecting = false; // 토큰이 없을 경우 강제 redirect

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error.config;

    const accTk = sessionStorage.getItem('accessToken');

    // access token이 없는 경우
    if (error.response?.status === 401 && !accTk) {
      if (!isRedirecting) {
        isRedirecting = true;
        useMyPageStore.getState().clear();
        useAuthStore.getState().logout();
        alert('로그인이 필요한 서비스입니다.');
        window.location.href = '/signin';
      }
      return Promise.reject(error);
    }

    // acctoken은 발급 받았지만 401인 경우
    if (error.response?.status === 401 && accTk && !originalReq._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push((token) => {
            if (token) {
              originalReq.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalReq));
            } else {
              reject(new Error('리프레시 토큰을 통한 갱신 실패'));
            }
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

        const { accessToken: newAccToken, refreshToken: newRefToken } = res.data.data;
        sessionStorage.setItem('accessToken', newAccToken);
        sessionStorage.setItem('refreshToken', newRefToken);
        pendingRequests.forEach((cb) => cb(newAccToken));

        originalReq.headers.Authorization = `Bearer ${newAccToken}`;
        return apiClient(originalReq);
      } catch (e) {
        console.error('리프레시 토큰이 만료되었습니다 : ' + e);
        alert('토큰이 만료되었습니다 (ERR: E0001)');

        sessionStorage.clear();
        pendingRequests.forEach((cb) => cb(null));
        window.location.href = '/signin';
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
        pendingRequests = [];
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
