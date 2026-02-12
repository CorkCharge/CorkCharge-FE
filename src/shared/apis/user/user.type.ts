import type { CorkageTypeEn, PriorityRequest } from '../helpRequest/helpRequest.type';

export type Role = 'USER' | 'OWNER';

export interface MyReqDetailResponse extends MyRequestListResponse {
  corkageType: CorkageTypeEn;
  preferredPrice: 14000;
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
  scrap_count: 89;
  userId: number;
  content: string;
  rating: number;
  reviewImageUrl: string;
  createdAt: string;
}
