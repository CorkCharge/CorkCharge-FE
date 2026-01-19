import { useEffect, useState } from 'react';

import { fetchNearStore } from '@/shared/apis/restaurant/restaurant.api';
import type { NearRestaurantResponse } from '@/shared/apis/restaurant/restaurant.type';

import arrow from '@/shared/assets/right_arrow.svg';
import star from '@/shared/assets/star.svg';
import sushi from './assets/sushi.png';
import chinese from './assets/chinese.png';
import italian from './assets/italian.png';
import rawFish from './assets/raw-fish.png';
import meat from './assets/meat.png';

const STORE_CATEGORY = [
  { title: '중국요리', imgName: chinese },
  { title: '회', imgName: rawFish },
  { title: '이탈리안', imgName: italian },
  { title: '초밥', imgName: sushi },
  { title: '육류, 고기', imgName: meat },
];

function StoresInfo() {
  const [nearStores, setNearStores] = useState<NearRestaurantResponse[]>([]);

  useEffect(() => {
    getNearStore();
  }, []);

  const getNearStore = async () => {
    try {
      const res = await fetchNearStore();
      console.log(res);
      setNearStores(res);
    } catch (e) {
      console.error('근처 매장 가져오기 실패: ' + e);
    }
  };

  const renderCategoryStore = () =>
    STORE_CATEGORY.map((category, idx) => (
      <div key={idx} className="flex cursor-pointer flex-col items-center gap-1">
        <img src={category.imgName} className="size-[115px] rounded-full" />
        <span className="font-medium text-[var(--gray-8)]">{category.title}</span>
      </div>
    ));

  const renderNearStores = () =>
    nearStores.map((store, idx) => (
      <div key={idx} className="cursor-pointer">
        {store.mainImageUrls ? (
          <img className="size-[172px] rounded-t-2xl" />
        ) : (
          <div className="size-[172px] rounded-t-2xl bg-black" />
        )}
        <div className="flex h-[44px] items-center justify-center rounded-b-2xl bg-[var(--glass)] text-sm font-bold text-[var(--gray-8)]">
          {store.corkagePrice}
        </div>
        <div className="mt-2">
          <span className="font-bold">{store.restaurantName}</span>
          <div className="flex items-center">
            <img src={star} className="mr-1" />
            <span>{store.rating}</span>
            <span className="ml-2 text-sm">리뷰 total {store.reviewCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    ));

  const renderHotPlaceStores = () =>
    [...new Array(5)].map((_, idx) => (
      <div key={idx} className="cursor-pointer">
        {/* <img /> */}
        <div className="size-[172px] rounded-t-2xl bg-black" />
        <div className="flex h-[44px] items-center justify-center rounded-b-2xl bg-[var(--glass)] text-sm font-bold text-[var(--gray-8)]">
          병당 콜키지: 1병 1만원
        </div>
        <div className="mt-2">
          <span className="font-bold">성수 누메르도스</span>
          <div className="flex items-center">
            <img src={star} className="mr-1" />
            <span>4.2</span>
            <span className="ml-2 text-sm">리뷰 total 3,214</span>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="mt-4">
      {/* 코르크차지 추천 매장 */}
      <div className="relative px-4">
        <span className="font-bold text-[var(--gray-8)]">카테고리별 추천 매장</span>
        <img src={arrow} className="absolute right-5 top-1 h-[17px] w-[10px] cursor-pointer" />
      </div>
      <div className="mt-2 flex gap-[10px] overflow-auto px-4">{renderCategoryStore()}</div>

      {/* 가까운 매장 */}
      <div className="relative mb-2 mt-3 px-4">
        <span className="font-bold text-[var(--gray-8)]">가까운 매장</span>
        <img src={arrow} className="absolute right-5 top-1 h-[17px] w-[10px] cursor-pointer" />
      </div>
      <div className="mt-2 flex gap-[10px] overflow-auto px-4">{renderNearStores()}</div>
      <div className="mx-4 my-5 rounded-lg bg-[var(--glass)] p-4 font-bold text-[var(--gray-8)]">
        광고배너
      </div>

      {/* 추천 데이터코스 */}
      <div className="relative px-4">
        <span className="font-bold text-[var(--gray-8)]">핫플 콜키지 추천매장</span>
        <img src={arrow} className="absolute right-5 top-1 h-[17px] w-[10px] cursor-pointer" />
      </div>
      <div className="my-2 flex gap-[10px] overflow-auto px-4">{renderHotPlaceStores()}</div>
    </div>
  );
}

export default StoresInfo;
