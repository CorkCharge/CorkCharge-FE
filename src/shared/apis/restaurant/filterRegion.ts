import apiClient from '../apiClient';

export interface FilterRestaurantsParams {
  type: 'map' | 'hot';
  sido?: string;
  sigungu?: string;
  dong?: string[]; // 여러 개 가능
}

export interface Restaurant {
  restaurantId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface FilterRegionResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    restaurants: Restaurant[];
  };
}

export const fetchFilteredRegion = async (
  params: FilterRestaurantsParams
): Promise<FilterRegionResponse> => {
  const searchParams = new URLSearchParams();

  // type은 필수
  searchParams.append('type', params.type);

  // 선택적 파라미터 추가
  if (params.sido) searchParams.append('sido', params.sido);
  if (params.sigungu) searchParams.append('sigungu', params.sigungu);
  if (params.dong) {
    params.dong.forEach((d) => searchParams.append('dong', d));
  }

  const response = await apiClient.get<FilterRegionResponse>(
    `/restaurants/filter?${searchParams.toString()}`
  );

  return response.data;
};
