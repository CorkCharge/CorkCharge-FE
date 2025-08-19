// import React from 'react'
import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import link from '@/shared/components/detail/assets/link.svg';

const PairingInfo = (restaurant: RestaurantInfo) => {
  return (
    <div>
      <div className="relative">
        <div className="flex justify-between pl-0 pr-0">
          <div className="relative">
            <img src="https://placehold.co/173X260" />
            <div className="absolute bottom-4 left-4 w-[90px] text-[24px] font-bold text-white">
              {/* 라구버거 */}
              {restaurant.representMenu}
            </div>
          </div>
          <div className="relative">
            <img src="https://placehold.co/173X260" />
            <div className="absolute bottom-4 left-4 w-[90px] text-[24px] font-bold text-white">
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
        {/* 라구 햄버거의 진한 육즙과 풍미가 기네스 맥주의 깊고 부드러운 몰트향과 완벽하게 어우러지는
        조화로운 페어링입니다. */}
        {restaurant.pairingDescription}
      </div>
    </div>
  );
};

export default PairingInfo;
