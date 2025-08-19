import apiClient from '../apiClient';

// export interface HotRestaurant {
//   restaurantId: number; //12,
//   name: string; //"성수 누메로도스",
//   address: string; //"서울시 성동구 상수동 340-2",
//   distance: string; //"1.2km",
//   bookmarkCount: number; //198,
//   openTime: string; //"17:00",
//   closeTime: string; //"24:00",
//   imageUrl: string; //"https://example.com/image.jpg"
// }

export interface HotRestaurant {
  restaurantId: number; //1,
  restaurantName: string; //"서북면옥",
  address: string; //"서울특별시 광진구 자양로 199-1 (구의동)",
  bookmarkCount: number; //5,
  openingHours: string; //null,
  imageUrl: string; //null
}

export interface HotStoreResponse {
  success: boolean;
  code: number;
  message: string;
  data: HotRestaurant[];
}

export const fetchHotRestaurant = async (): Promise<HotRestaurant[]> => {
  const response = await apiClient.get<HotStoreResponse>(`/restaurants/hot`);
  console.log(response);

  return response.data.data;
};
