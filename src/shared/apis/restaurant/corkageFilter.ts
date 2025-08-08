import apiClient from '../apiClient';

export type OptionType = 'GLASS_PROVIDED' | 'ICE_PROVIDED' | 'ETC';
export type CorkageType = 'PER_BOTTLE' | 'PER_TABLE' | 'MULTIPLE' | 'FREE';
export interface CorkageFilterRequest {
  minScore?: number;
  maxScore?: number;
  minBottlePrice?: number;
  maxBottlePrice?: number;
  minPersonPrice?: number;
  maxPersonPrice?: number;
  minTablePrice?: number;
  maxTablePrice?: number;
  optionTypes?: OptionType[];
  corkageTypes?: CorkageType[];
}

export interface CorkageRestaurant {
  restaurantId: number;
  name: string;
  address: string;
}

export interface CorkageFilterResponse {
  success: boolean;
  code: number;
  message: string;
  data: CorkageRestaurant[];
}

export const filterCorkages = async (
  payload: CorkageFilterRequest
): Promise<CorkageFilterResponse> => {
  const res = await apiClient.post<CorkageFilterResponse>('/corkages/filter', payload);
  return res.data;
};
