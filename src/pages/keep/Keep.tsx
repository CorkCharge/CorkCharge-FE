// import React from 'react'
import StoreCard from '@/shared/components/StoreCard';
import Review from './Review';
import { useEffect, useState } from 'react';
import TopBar from '@/shared/components/TopBar';
import type { Selected } from '@/shared/components/home/type';
import { fetchTipList, type TipList } from '@/shared/apis/tip/tipListApi';
import { fetchSavedRestaurant, type SavedResto } from '@/shared/apis/bookmark/restaurantApi';
import { fetchSavedTip, type SavedTip } from '@/shared/apis/bookmark/tipApi';
import SavedCuration from './SavedCuration';

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

  //fetchRestosData (저장된 매장만)
  const [savedRestos, SetSavedRestos] = useState<SavedResto[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchSavedRestaurant();
        console.log(res);
        SetSavedRestos(res);
      } catch {
        console.error('저장한 식당 list API  호출 실패');
      }
    };
    fetchData();
  }, []);

  //fetchTipData (저장된 tip만)
  const [savedTips, SetSavedTips] = useState<SavedTip[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchSavedTip();
        // console.log(res);
        console.log('저장한 tip list API  호출 성공');
        SetSavedTips(res);
      } catch {
        console.error('저장한 tip list API  호출 실패');
      }
    };
    fetchData();
  }, []);

  const [selected, setSelected] = useState<Selected>('ALL');

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
      {review ? (
        //저장한 리뷰 목록 -> restaurantId 받아올 수 있음.
        <Review />
      ) : store ? (
        <>
          {/* keep된것만 map 필요 */}
          {savedRestos &&
            savedRestos.map((savedResto) => {
              return (
                <StoreCard
                  restaurantId={savedResto.restaurantId}
                  imageUrl={savedResto.thumbnailUrl}
                  keep={savedResto.bookmarkCount}
                  price={savedResto?.corkagePrice ?? '0원'}
                  name={savedResto.name}
                  local={savedResto.address}
                  rating={savedResto.rating}
                />
              );
            })}
        </>
      ) : (
        <>
          {/* 이것도 저장한 것만 보여주도록 page 만들어야할듯 */}
          <div className="h-[15px]"></div>
          <div>저장한 tip</div>
          <SavedCuration selected={selected} setSelected={setSelected} tiplist={savedTips} />
        </>
      )}
    </div>
  );
};
export default Keep;
