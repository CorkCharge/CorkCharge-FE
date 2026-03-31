import { useState } from 'react';

import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';

import check from './assets/check.svg';

const StoreInfo = ({ restaurant }: { restaurant: RestaurantInfo }) => {
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false);

  const handleCopy = async (copied: string) => {
    try {
      await navigator.clipboard.writeText(copied);
      setIsCopiedModalOpen(true);
      setTimeout(() => setIsCopiedModalOpen(false), 1000);
    } catch (e) {
      console.error('복사 실패: ' + e);
    }
  };

  return (
    <div>
      <div className="px-4">
        <div className="border-b-2 pb-1 pt-4 text-[16px] font-bold">가게 정보</div>
        <div className="flex border border-x-0 pb-2 pt-2">
          <div className="w-[20%] text-[16px] font-bold">가게명</div>
          <div>{restaurant.restaurantName}</div>
        </div>
        <div className="flex border border-x-0 pb-2 pt-2">
          <div className="w-[20%] text-nowrap font-bold">전화번호</div>
          <div className="mr-2 text-[var(--gray-8)] underline">{restaurant.phone}</div>
          <span
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-[var(--sand)] px-2 py-1 text-[10px] text-white"
            onClick={() => handleCopy(restaurant.phone)}
          >
            복사
          </span>
        </div>
        <div className="flex border border-x-0 pb-2 pt-2">
          <div className="w-[20%] text-nowrap font-bold">주소</div>
          <div className="">
            <span className="mr-2 align-middle text-[var(--gray-8)] underline">
              {restaurant.address}
            </span>
            <span
              className="inline-flex w-fit cursor-pointer items-center justify-center rounded-3xl bg-[var(--sand)] px-2 py-1 align-middle text-[10px] text-white"
              onClick={() => handleCopy(restaurant.address)}
            >
              복사
            </span>
          </div>
        </div>
        <div className="flex border border-x-0 pb-2 pt-2">
          <div className="w-[20%] shrink-0 text-nowrap font-bold">영업시간</div>
          {restaurant.openingHours ? (
            <div>
              {restaurant.openingHours.split(',').map((h, idx) => (
                <p key={idx}>{h}</p>
              ))}
            </div>
          ) : (
            <p>운영시간 정보 없음</p>
          )}
        </div>
      </div>

      {/* 복사완료 모달 */}
      {isCopiedModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/50">
          <div className="absolute top-12 flex h-12 w-[125px] items-center justify-center rounded-xl bg-white p-6 font-semibold text-[var(--primary)] shadow-lg">
            <img src={check} />
          </div>
        </div>
      )}
    </div>
  );
};
export default StoreInfo;
