import apiClient from '../apiClient';

export interface SavedResto {
  restaurantId: number; //1;
  name: string; //'서북면옥';
  address: string; //'서울특별시 광진구 자양로 199-1 (구의동)';
  thumbnailUrl: string; //'';
  rating: number; //5.0;
  reviewCount: number; //3;
  bookmarkCount: number; //3;
  hasCorkage: boolean; //false;
  corkageType: string | null; //null;
  corkagePrice: string | null; //null;
  createdAt: string; //'2025-08-06T17:53:17.113915';
}

export interface SavedRestoResponse {
  success: boolean;
  code: number;
  message: string;
  data: SavedResto[];
}

export const fetchSavedRestaurant = async (): Promise<SavedResto[]> => {
  const response = await apiClient.get<SavedRestoResponse>(`/bookmarks/restaurant`);
  console.log(response);

  return response.data.data;
};
