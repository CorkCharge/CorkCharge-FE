import type { CorkageTypeEn, PriorityRequest } from '../helpRequest/helpRequest.type';

export type Role = 'USER' | 'OWNER';

export interface MyReqDetailResponse extends MyRequestListResponse {
  corkageType: CorkageTypeEn;
  preferredPrice: number;
  firstPriority: PriorityRequest;
  secondPriority: PriorityRequest;
  content: string;
}

export interface MyRequestListResponse {
  helprequestId: number;
  restaurantName: string;
  createdAt: string;
}

// 나의 리뷰 리스트 응답
export interface MyReviewResponse {
  reviewId: number;
  restaurantId: number;
  restaurantName: string;
  scrap_count: number;
  userId: number;
  content: string;
  rating: number;
  reviewImageUrl: string;
  createdAt: string;
}

// 사장님 가게 응답
export interface MasterStoreResponse {
  restaurantId: number;
  restaurantName: string;
  rating: number;
  totalReviewCount: number;
  openingHours: string;
  corkagePrice: string;
  corkageOptions: string[];
  mainImages: string[];
}

// 사장님 콜키지 등록 응답
export interface EnrollCorkageResponse {
  restaurantId: number;
  restaurantName: string;
  address: string;
  mainImageUrl: string;
}

// 사장님 콜키지 등록 요청
export interface EnrollCorkageRequest {
  restaurantId: number;
  corkageType: string;
  corkagePrice: number;
  multiCorkages: { liquorType: string; price: number }[] | null;
  optionTypes: string[];
  etcContent: string | null;
}
