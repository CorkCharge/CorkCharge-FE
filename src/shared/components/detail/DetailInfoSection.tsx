// import React from 'react'
import { useState } from 'react';
import DetailInfo from './DetailInfo';
import StoreInfo from './StoreInfo';
import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import ReviewInfo from './ReviewInfo';

// restaurantId: number; //2,
// restaurantName: string; //"가람성",
// address: string; //"서울특별시 광진구 광나루로24길 22 (화양동)",
// phone: string; //"02 4449009",
// rating: number; //0.0,
// reviewCount: number; //4,
// mainImageUrl: string | null; //null,
// menuImageUrl: string | null; //null,
// representMenu: string; //null,
// pairingAlcohol: string; //null,
// pairingDescription: string; //null,
// pairingImageUrl: string; //null,
// openingHours: string; //null,
// reviews: reviewProps[];

const DetailInfoSection = (restaurantInfo: RestaurantInfo) => {
  // 0: 페어링 정보, 1: 가게 정보, 2: 리뷰
  const [corkSelect, setCorkSelect] = useState(0);
  const [corkSelected, setCorkSelected] = useState<boolean>(true);
  const [storeSelected, setStoreSelected] = useState<boolean>(false);
  const handleCorkclick = () => {
    setCorkSelected(true);
    setStoreSelected(false);
  };
  const handleStoreclick = () => {
    setStoreSelected(true);
    setCorkSelected(false);
  };
  return (
    <div className="w-full">
      <div className="mb-5 flex h-10 w-full items-center justify-between gap-2 border-b border-[var(--gray-2)] px-6 text-sm">
        <button
          onClick={() => setCorkSelect(0)}
          className={`h-full flex-1 border-x-0 border-b-[2px] border-t-0 border-solid font-medium ${corkSelect === 0 ? 'border-black text-black' : 'border-transparent text-[var(--gray-6)]'}`}
        >
          페어링 정보
        </button>
        <button
          onClick={() => setCorkSelect(1)}
          className={`h-full flex-1 border-x-0 border-b-[2px] border-t-0 border-solid font-medium ${corkSelect === 1 ? 'border-black text-black' : 'border-transparent text-[var(--gray-6)]'}`}
        >
          가게 정보
        </button>
        <button
          onClick={() => setCorkSelect(2)}
          className={`h-full flex-1 border-x-0 border-b-[2px] border-t-0 border-solid font-medium ${corkSelect === 2 ? 'border-black text-black' : 'border-transparent text-[var(--gray-6)]'}`}
        >
          리뷰
        </button>
      </div>

      {corkSelect === 0 && <DetailInfo {...restaurantInfo} />}
      {corkSelect === 1 && <StoreInfo {...restaurantInfo} />}
      {corkSelect === 2 && <ReviewInfo />}
    </div>
  );
};

export default DetailInfoSection;
