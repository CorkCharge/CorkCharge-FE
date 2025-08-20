// import React from 'react'
import { useState } from 'react';
import DetailInfo from './DetailInfo';
import StoreInfo from './StoreInfo';
import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';

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
  const [corkSelected, setCorkSelected] = useState<boolean>(true);
  const [storeSelected, setStoreSelected] = useState<boolean>(false);
  const handleCorkclick = () => {
    console.log('레스토랑 정보', restaurantInfo);
    setCorkSelected(true);
    setStoreSelected(false);
  };
  const handleStoreclick = () => {
    setStoreSelected(true);
    setCorkSelected(false);
  };
  return (
    <div>
      <div className="flex h-[40px] w-[393px] items-center justify-center gap-14 border-b text-[14px]">
        <button
          onClick={handleCorkclick}
          className={`border-b-1 h-full w-[120px] border-x-0 border-t-0 border-solid ${corkSelected ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
        >
          콜키지
        </button>
        <button
          onClick={handleStoreclick}
          className={`h-full w-[120px] border-x-0 border-b-2 border-t-0 border-solid ${storeSelected ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
        >
          매장
        </button>
      </div>
      {corkSelected ? (
        <>
          <DetailInfo {...restaurantInfo} />
        </>
      ) : (
        <>
          <StoreInfo {...restaurantInfo} />
        </>
      )}
    </div>
  );
};

export default DetailInfoSection;
