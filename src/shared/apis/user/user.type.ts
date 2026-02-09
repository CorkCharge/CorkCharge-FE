import type { CorkageTypeEn, PriorityRequest } from '../helpRequest/helpRequest.type';

export type Role = 'USER' | 'OWNER';

// const corkageTypeMapping: Record<CorkageTypeKr, CorkageTypeEn> = {
//   테이블당: 'PER_TABLE',
//   병당: 'PER_BOTTLE',
//   인당: 'PER_PERSON',
// };

// const priorityMapping: Record<Priority, PriorityRequest> = {
//   extraGlass: 'GLASS_PROVIDED',
//   ice: 'ICE_PROVIDED',
//   decanting: 'DECANTING',
// };

export interface MyReqDetailResponse {
  success: boolean;
  code: number;
  message: string;
  helprequestId: 1;
  restaurantName: string;
  corkageType: CorkageTypeEn;
  preferredPrice: number;
  firstPriority: PriorityRequest;
  secondPriority: PriorityRequest;
  content: string;
  createdAt: string;
}
