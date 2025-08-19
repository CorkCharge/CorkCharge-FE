import apiClient from '../apiClient';

// API 요청 Body 타입 정의
export interface AddCorkageRequest {
  restaurantId: number;
  corkageType: string;
  corkagePrice: number;
  multiCorkages: { liquorType: string; price: number }[] | null;
  optionTypes: string[];
  etcContent: string | null;
}

// API 응답 타입 정의
interface AddCorkageResponse {
  success: boolean;
  code: number;
  message: string;
  data: object;
}

/**
 * 새로운 콜키지 정보를 서버에 등록하는 함수
 * @param data 등록할 콜키지 정보
 * @param accessToken 사용자 인증 토큰
 * @returns API 응답 데이터
 */
export const addCorkageInfo = async (data: AddCorkageRequest) => {
  const response = await apiClient.post<AddCorkageResponse>('/corkages', data);
  return response.data;
};
