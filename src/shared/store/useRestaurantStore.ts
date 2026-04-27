import { create } from 'zustand';

import type { RestaurantInfo } from '../apis/restaurant/corkageApi';

type RestaurantStore = {
  restInfo: RestaurantInfo;
  setRestInfo: (_: RestaurantInfo) => void;
};

const useRestaurantStore = create<RestaurantStore>((set) => ({
  restInfo: {
    restaurantId: 88,
    restaurantName: '램니쿠야',
    address: '서울 광진구 아차산로 395',
    phone: '0507-1404-1532',
    rating: 0.0,
    reviewCount: 2,
    mainImageUrl: '',
    menuImageUrl: '',
    corkagePrice: '병당 5000원',
    corkageOptions: ['잔 제공', '얼음 제공'],
    representMenu: '양갈비',
    pairingAlcohol: '월계관 준마이',
    pairingDescription:
      '월계관 준마이의 은은한 쌀 내음과 부드러운 목넘김이 양고기 징기스칸의 진한 육즙과 만나 풍미를 더욱 깊게 만들어줍니다.',
    pairingImageUrl:
      'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/corkage/%EB%9E%A8%EB%8B%88%EC%BF%A0%EC%95%BC_%EC%A3%BC%EB%A5%98%EC%82%AC%EC%A7%84.png',
    openingHours: '매일 16:00 - 24:00',
    operationStatus: '',
  },
  setRestInfo: (newRest) => set({ restInfo: newRest }),
}));

export default useRestaurantStore;
