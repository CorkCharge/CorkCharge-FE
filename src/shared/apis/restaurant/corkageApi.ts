import apiClient from '../apiClient';

//코르크차지 식당 목록
export interface Corkage {
  restaurantId: number; // 1,
  name: string; // "엔비햄버거",
  address: string; // "서울시 성동구 상수동 340-2",
  corkagePrice: string; // "1병 1만원",
  imageUrl: string; // "https://s3.url/main.jpg",
  reviewCount: number; // 3124,
  averageRating: number; // 4.2,
  bookmarkCount: number; // 88
  openingHours: string;
}

export interface CorkageResponse {
  success: boolean;
  code: number;
  message: string;
  data: Corkage[];
}

export const fetchCorkageList = async (): Promise<Corkage[]> => {
  const response = await apiClient.get<CorkageResponse>(`/restaurants`);
  console.log(response);

  return response.data.data;
};

//식당 정보 상세페이지
export interface RestaurantInfo {
  restaurantId: number; //2,
  restaurantName: string; //"가람성",
  address: string; //"서울특별시 광진구 광나루로24길 22 (화양동)",
  phone: string; //"02 4449009",
  rating: number; //0.0,
  reviewCount: number; //4,
  mainImageUrl: string | null; //null,
  menuImageUrl: string | null; //null,
  corkagePrice: string; //"소주 병당: 3000원, 맥주 병당: 4000원",
  corkageOptions: string[];
  representMenu: string; //null,
  pairingAlcohol: string; //null,
  pairingDescription: string; //null,
  pairingImageUrl: string; //null,
  openingHours: string; //null,
  reviews: reviewProps[];

  // restaurantId: number; // 1,
  // name: string; // "엔비햄버거",
  // address: string; // "서울시 성동구 상수동 340-2",
  // latitude: number;
  // longitude: number;
  // phone: string;
  // bizType: string;
  // hasCorkage: boolean;
  // rating: number;
  // bookmarkCount: number;
  // images: {
  //   imageUrl: string | null;
  //   type: string;
  // };
  // corkageInfo: corkageInfoProps;
  // reviews: {
  //   totalCount: number;
  //   reviewList: review[];
  // };
}

export interface reviewProps {
  writer: string; //"Charlie",
  content: string; //"딱히?!",
  rating: number; //2,
  createdAt: string; //"2025-07-21T20:02:52.879934",
  imageUrls: string[] | null; //[]
}

export interface RestaurantResponse {
  success: boolean;
  code: number;
  message: string;
  data: RestaurantInfo;
}

export const fetchRestaurant = async (id: number): Promise<RestaurantInfo> => {
  // const id = encodeURIComponent(String(restaurantId));
  const response = await apiClient.get<RestaurantResponse>(`/restaurants/${id}`);
  if (!response?.data?.data) throw new Error('빈 응답입니다.');
  else console.log(response);

  return response.data.data;
  // return restaurantId(response.data?.data);
};
