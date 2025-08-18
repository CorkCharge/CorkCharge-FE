export interface FilterRequest {
  minScore: number;
  maxScore: number;
  minBottlePrice: number | null;
  maxBottlePrice: number | null;
  minPersonPrice: number | null;
  maxPersonPrice: number | null;
  minTablePrice: number | null;
  maxTablePrice: number | null;
  optionTypes: string[];
  corkageTypes: string[];
}

/**
 * 필터링 API 응답 데이터 배열에 포함된 개별 레스토랑의 타입입니다.
 */
export interface FilteredRestaurant {
  restaurantId: number;
  name: string;
  address: string;
}
