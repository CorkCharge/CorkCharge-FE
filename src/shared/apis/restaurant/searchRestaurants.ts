import apiClient from '../apiClient';

export interface Restaurant {
  restaurantId: number;
  name: string;
  address: string;
}

interface RestaurantResponse {
  code: number;
  data: Restaurant[];
  success: boolean;
  message: string;
}

export const searchRestaurants = async (searchQuery: string): Promise<Restaurant[]> => {
  const res = await apiClient.get<RestaurantResponse>('/restaurants/search', {
    params: { keyword: searchQuery },
  });

  return res.data.data;
};
