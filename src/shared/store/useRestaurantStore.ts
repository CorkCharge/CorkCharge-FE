import { create } from 'zustand';

interface Review {
  reviewId: number;
  writer: string;
  content: string;
  rating: number;
  createdAt: string;
  imageUrls: string[];
  savedCount: number;
}

interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  mainImageUrl: string | null;
  menuImageUrl: string | null;
  corkagePrice: string;
  corkageOptions: string[];
  representMenu: string;
  pairingAlcohol: string;
  pairingDescription: string;
  pairingImageUrl: string;
  openingHours: string;
  reviews: Review[];
}

interface RestaurantProps {
  restInfo: Restaurant;
  setRestInfo: (newRest: Restaurant) => void;
}

// const useRestaurantStore = create<RestaurantProps>((set) => ({
//   restInfo: {
//     restaurantId: 88,
//     restaurantName: '램니쿠야',
//     address: '서울 광진구 아차산로 395',
//     phone: '0507-1404-1532',
//     rating: 0.0,
//     reviewCount: 2,
//     mainImageUrl:
//       'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/restaurant/%EB%9E%A8%EB%8B%88%EC%BF%A0%EC%95%BC_%EB%A7%A4%EC%9E%A5%EC%82%AC%EC%A7%84.png',
//     menuImageUrl:
//       'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/restaurant/%EB%9E%A8%EB%8B%88%EC%BF%A0%EC%95%BC_%EB%A9%94%EB%89%B4%EC%82%AC%EC%A7%84.png',
//     corkagePrice: '병당 5000원',
//     corkageOptions: ['잔 제공', '얼음 제공'],
//     representMenu: '양갈비',
//     pairingAlcohol: '월계관 준마이',
//     pairingDescription:
//       '월계관 준마이의 은은한 쌀 내음과 부드러운 목넘김이 양고기 징기스칸의 진한 육즙과 만나 풍미를 더욱 깊게 만들어줍니다.',
//     pairingImageUrl:
//       'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/corkage/%EB%9E%A8%EB%8B%88%EC%BF%A0%EC%95%BC_%EC%A3%BC%EB%A5%98%EC%82%AC%EC%A7%84.png',
//     openingHours: '매일 16:00 - 24:00',
//     reviews: [
//       {
//         reviewId: 1,
//         writer: 'sds',
//         content: '맛있어요!',
//         rating: 5,
//         createdAt: '2025-07-19T02:04:27.071878',
//         imageUrls: [],
//         savedCount: 3,
//       },
//       {
//         reviewId: 2,
//         writer: 'sds',
//         content: '맛있어요!',
//         rating: 5,
//         createdAt: '2025-07-19T02:09:10.791539',
//         imageUrls: [
//           'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/review_6d928ca6-1d59-48b5-95cf-4c84bf652ead_서북면옥 리뷰 사진.jpeg',
//         ],
//         savedCount: 1,
//       },
//     ],
//   },

//   setRestInfo: (newRest) => set({ restInfo: newRest }),
// }));

import type { RestaurantInfo } from '../apis/restaurant/corkageApi';

type RestaurantStore = {
  restInfo: RestaurantInfo;
  setRestInfo: (newRest: RestaurantInfo) => void;
};

const useRestaurantStore = create<RestaurantStore>((set) => ({
  restInfo: {
    restaurantId: 88,
    restaurantName: '램니쿠야',
    address: '서울 광진구 아차산로 395',
    phone: '0507-1404-1532',
    rating: 0.0,
    reviewCount: 2,
    mainImageUrl:
      'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/restaurant/%EB%9E%A8%EB%8B%88%EC%BF%A0%EC%95%BC_%EB%A7%A4%EC%9E%A5%EC%82%AC%EC%A7%84.png',
    menuImageUrl:
      'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/restaurant/%EB%9E%A8%EB%8B%88%EC%BF%A0%EC%95%BC_%EB%A9%94%EB%89%B4%EC%82%AC%EC%A7%84.png',
    corkagePrice: '병당 5000원',
    corkageOptions: ['잔 제공', '얼음 제공'],
    representMenu: '양갈비',
    pairingAlcohol: '월계관 준마이',
    pairingDescription:
      '월계관 준마이의 은은한 쌀 내음과 부드러운 목넘김이 양고기 징기스칸의 진한 육즙과 만나 풍미를 더욱 깊게 만들어줍니다.',
    pairingImageUrl:
      'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/corkage/%EB%9E%A8%EB%8B%88%EC%BF%A0%EC%95%BC_%EC%A3%BC%EB%A5%98%EC%82%AC%EC%A7%84.png',
    openingHours: '매일 16:00 - 24:00',
    reviews: [
      {
        reviewId: 1,
        writer: 'sds',
        content: '맛있어요!',
        rating: 5,
        createdAt: '2025-07-19T02:04:27.071878',
        imageUrls: [],
        savedCount: 3,
      },
      {
        reviewId: 2,
        writer: 'sds',
        content: '맛있어요!',
        rating: 5,
        createdAt: '2025-07-19T02:09:10.791539',
        imageUrls: [
          'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/review_6d928ca6-1d59-48b5-95cf-4c84bf652ead_서북면옥 리뷰 사진.jpeg',
        ],
        savedCount: 1,
      },
    ],
  },
  setRestInfo: (newRest) => set({ restInfo: newRest }),
}));

export default useRestaurantStore;
