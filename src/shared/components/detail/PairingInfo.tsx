// import React from 'react'
import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import link from '@/shared/components/detail/assets/link.svg';

const PairingInfo = (restaurant: RestaurantInfo) => {
  return (
    <div>
      <div className="relative">
        <div className="grid w-full grid-cols-2 gap-3 pl-0 pr-0">
          <div className={`relative aspect-square ${!restaurant.menuImageUrl && 'bg-gray-500'}`}>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
            {restaurant.menuImageUrl && (
              <img src={restaurant.menuImageUrl} className="h-full w-full" />
            )}
            <div className="absolute bottom-4 left-4 w-full text-[24px] font-bold text-white">
              {restaurant.representMenu}
            </div>
          </div>
          <div className={`relative aspect-square ${!restaurant.pairingImageUrl && 'bg-gray-500'}`}>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
            {restaurant.pairingImageUrl && (
              <img src={restaurant.pairingImageUrl} className="h-full w-full" />
            )}
            <div className="absolute bottom-4 left-4 w-full text-[24px] font-bold text-white">
              {/* 기네스 스타우트 */}
              {restaurant.pairingAlcohol}
            </div>
          </div>
        </div>
        <img
          src={link}
          className="absolute left-1/2 top-1/2 w-[55px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="mb-8 ml-4 mr-4 mt-4 text-[17px] text-[#585A68]">
        {restaurant.pairingDescription}
      </div>
    </div>
  );
};

export default PairingInfo;
