/**
 * API 응답의 공통적인 구조를 정의하는 제네릭 인터페이스입니다.
 */
export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

/**
 * 클러스터링 레벨('dong', 'sigungu', 'sido')에서 API가 반환하는 데이터 포인트의 타입입니다.
 * 개별 매장의 위치 정보를 담고 있습니다.
 */
export interface ClusterPoint {
  restaurantId: number;
  latitude: number;
  longitude: number;
  address: string;
}

/**
 * 개별 매장 레벨('restaurant')에서 API가 반환하는 데이터 포인트의 타입입니다.
 * 콜키지 가격 정보를 포함합니다.
 */
export interface RestaurantPoint {
  restaurantId: number;
  latitude: number;
  longitude: number;
  price: string;
}

/**
 * 지도의 줌 레벨에 따라 구분되는 클러스터링 수준을 나타내는 타입입니다.
 */
export type MapLevel = 'restaurant' | 'dong' | 'sigungu' | 'sido';

/**
 * 지도 데이터 API 요청 시 사용되는 쿼리 파라미터의 타입입니다.
 */
export interface MapParams {
  level: MapLevel;
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
}

export interface ClusterListItem {
  restaurantId: number;
  name: string;
  rating: number;
  reviewCount: number;
  corkagePrice: string;
  corkageOptions: string[];
  imageUrl: string | null;
}
