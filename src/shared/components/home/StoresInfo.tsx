import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import type { StoreCard } from '@/shared/apis/restaurant/restaurant.type';

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

interface StoreInfoProps {
  nearStores: StoreCard[];
  hotStores: StoreCard[];
  isLoading: boolean;
}

function StoresInfo({ nearStores, hotStores, isLoading }: StoreInfoProps) {
  const navigate = useNavigate();

  // 데이터 패칭 중인 경우 spinner 표시
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center py-5">
        <ClipLoader color="var(--primary)" />
      </div>
    );

  const renderCategoryStore = () =>
    STORE_CATEGORY.map((category, idx) => (
      <div key={idx} className="flex cursor-pointer flex-col items-center gap-1">
        <img src={category.imgName} className="size-[115px] rounded-full" />
        <span className="font-medium text-[var(--gray-8)]">{category.title}</span>
      </div>
    ));

  const renderNearStores = () =>
    nearStores.map((store) => (
      <div
        key={store.restaurantId}
        className="cursor-pointer"
        onClick={() => navigate(`/detail-info/${store.restaurantId}`)}
      >
        {store.mainImageUrls ? (
          <img src={store.mainImageUrls} className="size-[172px] rounded-t-2xl" />
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
    hotStores.map((store) => (
      <div
        key={store.restaurantId}
        className="cursor-pointer"
        onClick={() => navigate(`/detail-info/${store.restaurantId}`)}
      >
        {store.mainImageUrls ? (
          <img src={store.mainImageUrls} className="size-[172px] rounded-t-2xl" />
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

  return (
    <div className="mt-4">
      {/* 카테고리별 추천 매장 */}
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

      {/* 핫플 콜키지 매장 */}
      <div className="relative px-4">
        <span className="font-bold text-[var(--gray-8)]">핫플 콜키지 추천매장</span>
        <img src={arrow} className="absolute right-5 top-1 h-[17px] w-[10px] cursor-pointer" />
      </div>
      <div className="my-2 flex gap-[10px] overflow-auto px-4">{renderHotPlaceStores()}</div>
    </div>
  );
}

export default StoresInfo;
