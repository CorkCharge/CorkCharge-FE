import apiClient from '../apiClient';

export interface HomeRestaruantInfo {
  restaurantId: number; //1,
  restaurantName: string; //"서북면옥",
  bookmarkCount: number; //10,
  imageUrl: string;
}
export interface HomeRestaruantResponse {
  success: boolean;
  code: number;
  message: string;
  data: HomeRestaruantInfo;
}

export const fetchHomeRestaurant = async (): Promise<HomeRestaruantInfo> => {
  const response = await apiClient.get<HomeRestaruantResponse>('/restaurants/home');
  if (!response?.data?.data) throw new Error('빈 응답입니다.');
  else console.log(response);
  return response.data.data;
};
