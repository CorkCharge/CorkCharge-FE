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

//사용x
// interface corkageInfoProps {
//   corkagePrice: string; //"1병당 1만원",
//   additionalOptions: string[]; //[
//   //   "잔 제공",
//   //   "얼음 제공",
//   //   "한병 무료"
//   // ],
//   pairing: string; //"라구버거 - 기네스 스타우트",
//   description: string; //"진한 흑맥주 풍미가 라구버거의 풍미와 조화롭게 어우러집니다."
// }

// interface reviewProps {
//   reviewId: number; //101,
//   userName: string; //"니콜라 테슬라",
//   content: string; //"몰트향과 완벽하게 어우러지는 조화로운 페어링입니다.",
//   createdAt: string; //"2025-01-01",
//   rating: number; //5,
//   imageUrl: string | null; //"https://example.com/review1.jpg"
// }

export interface RestaurantResponse {
  success: boolean;
  code: number;
  message: string;
  data: RestaurantInfo;
}

// const restaurantId = (d: any) => (Array.isArray(d) ? d[0] : d);

export const fetchRestaurant = async (id: number): Promise<RestaurantInfo> => {
  // const id = encodeURIComponent(String(restaurantId));
  const response = await apiClient.get<RestaurantResponse>(`/restaurants/${id}`);
  if (!response?.data?.data) throw new Error('빈 응답입니다.');
  else console.log(response);

  return response.data.data;
  // return restaurantId(response.data?.data);
};
