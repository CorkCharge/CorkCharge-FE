import apiClient from '../apiClient';

// 회원가입 및 로그인
export const userAuth = async ({ code, state }: { code: string; state: string }) => {
  const res = await apiClient.get('/oauth/naver/login', { params: { code, state } });
  return res.data.data;
};
