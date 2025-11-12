import apiClient from '../apiClient';

//tip 리스트 출력 api
export interface TipList {
  tipId: number;
  title: string;
  tipCategory?: string;
  imageUrl: string;
}

export interface TipListResponse {
  success: boolean;
  code: number;
  message: string;
  data: TipList[];
}

export const fetchTipList = async (): Promise<TipList[]> => {
  const response = await apiClient.get<TipListResponse>(`/tips`);
  console.log(response);

  return response.data.data;
};

//tip 상세 페이지 조회
export interface TipInfo {
  tipId: number; //6;
  title: string; //'와인 테스트';
  content: string; //'참석 전 물병, 스파이월러, 노트와 펜을 챙기면 편해요. 드레스 코드는 ‘스마트 캐주얼’인 경우가 많으니 미리 확인하시고, 일찍 도착해 무료 스낵도 즐겨보세요.';
  tipCategory: string; //'EVENT';
  imageUrls: string[];
  createdAt: string; //'2025-08-07T21:40:31.530027';
}

export interface TipInfoResponse {
  success: boolean;
  code: number;
  message: string;
  data: TipInfo;
}

export const fetchTipInfo = async (tipId: number): Promise<TipInfo> => {
  const response = await apiClient.get<TipInfoResponse>(`/tips/${tipId}`);
  console.log(response.data.data);

  return response.data.data;
};
