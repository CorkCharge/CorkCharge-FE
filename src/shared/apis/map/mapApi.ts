import apiClient from '../apiClient';
import type {
  ApiResponse,
  MapRestaurantData,
  MapParams,
  ClusterListResponse,
} from '@/shared/types/map';

/**
 * 서버에 지도 데이터를 요청하는 API 함수입니다.
 * @param params - 지도 레벨과 현재 보이는 영역의 좌표가 담긴 객체
 * @returns API 응답 데이터를 반환합니다.
 */
export const getMapData = async (params: MapParams) => {
  // 유효한 값만 남긴 객체 생성
  const cleanedData = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );

  // [🔍 디버깅용 로그 추가 2]
  // 이 로그가 실제 서버로 전송되는 JSON 형태입니다.
  console.log('[API] 서버로 전송되는 최종 Body:', cleanedData);
  // API 응답 데이터의 타입은 MapRestaurantData 배열이 될 수 있습니다.
  const response = await apiClient.post<ApiResponse<MapRestaurantData[]>>(
    '/restaurants/map',
    cleanedData
  );
  console.log('[API] 서버 응답 데이터 (Response):', response.data);
  return response.data;
};

{
  /* 다중핀 상세조회 */
}
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
