// import React from 'react'
import StoreCard from '@/shared/components/StoreCard';
import Review from '../../shared/components/keep/Review';
import { useState } from 'react';
import Curation from '@/shared/components/Curation';
import Tip from '../../shared/components/Tip';
import TopBar from '@/shared/components/TopBar';

const Keep = () => {
  const [review, setReview] = useState<boolean>(true);
  const [store, setStore] = useState<boolean>(false);
  const [tip, setTip] = useState<boolean>(false);
  const handleReviewSelected = () => {
    setReview(true);
    setStore(false);
    setTip(false);
  };
  const handleStoreSelected = () => {
    setReview(false);
    setStore(true);
    setTip(false);
  };
  const handleTipSelected = () => {
    setReview(false);
    setStore(false);
    setTip(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <div className="flex h-[60px] items-center text-[16px] font-bold text-[#35353F]">저장</div> */}
      <TopBar text="저장" />
      <div className="mb-2 flex h-[30px] w-[393px] items-center justify-center gap-14 border-b">
        <button
          onClick={handleReviewSelected}
          className={`h-full w-[120px] border-x-0 border-b-2 border-t-0 border-solid ${review ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
        >
          리뷰
        </button>
        <button
          onClick={handleStoreSelected}
          className={`h-full w-[120px] border-x-0 border-b-2 border-t-0 border-solid ${store ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
        >
          매장
        </button>
        <button
          onClick={handleTipSelected}
          className={`h-full w-[120px] border-x-0 border-b-2 border-t-0 border-solid ${tip ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
        >
          Tip
        </button>
      </div>

      {/* <div>

      </div> */}
      {review ? (
        //저장한 리뷰 목록
        <Review />
      ) : store ? (
        <>
          {/* keep된것만 map 필요 */}

          <StoreCard
            keep={88}
            price="1병당 1만원"
            name="깍뚝"
            local="500m 서울 광진구 어대로 1층"
            time="평일 17:00~24:00"
            rating={4.2}
            review={3124}
          />
        </>
      ) : (
        <>
          <Tip />
          <div className="h-[10px]"></div>
          <Curation />
        </>
      )}
    </div>
  );
};
export default Keep;
