/**
 * API 응답의 공통적인 구조를 정의하는 제네릭 인터페이스입니다.
 */
export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export interface MapRestaurantData {
  restaurantId: number;
  restaurantName: string;
  address: string;
  corkagePrice: string;
  lat: number;
  lon: number;
}

/**
 * 지도의 줌 레벨에 따라 구분되는 클러스터링 수준을 나타내는 타입입니다.
 */
export type MapLevel = 'restaurant' | 'dong' | 'sigungu' | 'sido';

/**
 * 지도 데이터 API 요청 시 사용되는 쿼리 파라미터의 타입입니다.
 */
export interface MapParams {
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
  // 선택적 필터링 파라미터들 (필요시 추가)
  keyword?: string;
  sido?: string;
  sigungu?: string;
  dongList?: string[];
  minScore?: number;
  maxScore?: number;
  minBottlePrice?: number;
  maxBottlePrice?: number;
  minPersonPrice?: number;
  maxPersonPrice?: number;
  minTablePrice?: number;
  maxTablePrice?: number;
  optionTypes?: string[];
  corkageTypes?: string[];
}

// [Legacy] 클러스터 리스트 조회용 (기존 유지)
export interface ClusterRestaurant {
  restaurantId: number;
  name: string; // JSON 명세에 따름
  address: string;
  rating: number;
  reviewCount: number;
  scrap: boolean;
  corkagePrice: string;
  corkageOptions: string[];
  imageUrls: string[];
  openingHours: string;
}

// [NEW] getClusterList API의 'data' 필드 내부 구조
export interface ClusterListResponse {
  restaurants: ClusterRestaurant[];
}
