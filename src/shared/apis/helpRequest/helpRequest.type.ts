export interface DoitStoreResponse {
  restaurantId: number;
  name: string;
  address: string;
  requestCount: number;
  openingHoursText: string;
  imageUrl: string;
}

export type CorkageTypeKr = '테이블당' | '인당' | '병당';
export type CorkageTypeEn = 'PER_TABLE' | 'PER_PERSON' | 'PER_BOTTLE';

export type Priority = 'extraGlass' | 'ice' | 'decanting';
export type PriorityRequest = 'GLASS_PROVIDED' | 'ICE_PROVIDED' | 'DECANTING';
