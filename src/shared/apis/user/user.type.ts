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
