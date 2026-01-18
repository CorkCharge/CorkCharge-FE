import apiClient from '../apiClient';
import type {
  ApiResponse,
  ClusterPoint,
  RestaurantPoint,
  MapParams,
  ClusterListResponse,
} from '@/shared/types/map';

/**
 * 서버에 지도 데이터를 요청하는 API 함수입니다.
 * @param params - 지도 레벨과 현재 보이는 영역의 좌표가 담긴 객체
 * @returns API 응답 데이터를 반환합니다.
 */
export const getMapData = async (params: MapParams) => {
  // API 응답 데이터의 타입은 ClusterPoint 배열 또는 RestaurantPoint 배열이 될 수 있습니다.
  const response = await apiClient.get<ApiResponse<ClusterPoint[] | RestaurantPoint[]>>(
    '/restaurants/map',
    { params }
  );
  return response.data;
};

export const getClusterList = async (
  restaurantIds: number[],
  sort?: string
): Promise<ClusterListResponse> => {
  console.log('[getClusterList] request 요청형식', {
    url: '/restaurants/cluster/list',
    body: { restaurantIds, sort },
  });
  const response = await apiClient.post<ApiResponse<ClusterListResponse>>(
    '/restaurants/cluster/list',
    { restaurantIds, sort }
  );
  console.log('[getClusterList] response는 이렇게 옵니다', response.status, response.data);
  return response.data.data;
};
