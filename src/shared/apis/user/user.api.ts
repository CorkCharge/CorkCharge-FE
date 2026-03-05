import apiClient from '../apiClient';
import type {
  EnrollCorkageRequest,
  EnrollCorkageResponse,
  MasterStoreResponse,
  MyRequestListResponse,
  MyReviewResponse,
  Role,
} from './user.type';

// role 부여
export const modifyRole = async ({ role, nickname }: { role: Role; nickname: string }) => {
  await apiClient.put('/users/role', { role, nickname });
};

// 유저 정보 조회
export const getUser = async () => {
  const res = await apiClient.get('/user');
  return res.data.data;
};

// 유저 정보 수정
export const modifyName = async (name: string) => {
  await apiClient.put('/users/modify', null, { params: { name } });
};

// 내가 쓴 리뷰 가져오기
export const getMyReviews = async (): Promise<MyReviewResponse[]> => {
  const res = await apiClient.get('/users/reviews');
  return res.data.data;
};

// 마이페이지 정보 조회 (닉네임, 이메일, 내가 쓴 리뷰)
export const getMyPageInfo = async () => {
  const res = await apiClient.get('/users/page');
  return res.data.data;
};

// 나의 해주세요 목록 조회
export const getMyRequestList = async (): Promise<MyRequestListResponse[]> => {
  const res = await apiClient.get('/users/helprequests');
  return res.data.data.helprequests;
};

// 나의 해주세요 상세 조회
export const getMyRequestDetail = async (id: number) => {
  const res = await apiClient.get(`/users/helprequests/${id}`);
  return res.data.data;
};

// 사장님 매장 검색 (가입 시)
export const getMasterRestaurant = async (): Promise<MasterStoreResponse[]> => {
  const res = await apiClient.get('/ownerRestaurant/my');
  return res.data.data.items;
};

// 사장님 사업자 등록증 입력
export const submitCertificate = async (cert: File) => {
  const formData = new FormData();
  formData.append('images', cert);
  await apiClient.put('/users/registration', formData);
};

// 사장님 콜키지 정보 등록하기
export const enrollCorkage = async (): Promise<EnrollCorkageResponse[]> => {
  const res = await apiClient.get('/corkages/verify');
  return res.data.data;
};

export const addCorkageInfo = async (data: EnrollCorkageRequest) => {
  const response = await apiClient.post('/corkages', data);
  return response.data;
};
