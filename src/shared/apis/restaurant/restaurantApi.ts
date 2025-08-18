import apiClient from '../apiClient';
import type { ApiResponse } from '@/shared/types/map'; // 공통 응답 타입 재사용
import type { FilterRequest, FilteredRestaurant } from '@/shared/types/filter';

/**
 * 선택된 필터 옵션을 기반으로 레스토랑 목록을 요청하는 API 함수
 * @param filterData - 사용자가 선택한 필터 조건 객체
 * @returns 필터링된 레스토랑 목록을 포함하는 API 응답 데이터
 */
export const postFilterData = async (filterData: FilterRequest) => {
  const response = await apiClient.post<ApiResponse<FilteredRestaurant[]>>(
    '/corkages/filter',
    filterData
  );
  return response.data;
};
