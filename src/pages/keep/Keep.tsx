import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import StoreCard from '@/shared/components/keep/StoreCard';
import Review from './Review';
import { fetchSavedRestaurant, type SavedResto } from '@/shared/apis/bookmark/restaurantApi';
import { fetchSavedTip } from '@/shared/apis/bookmark/tipApi';
import SavedCuration from './SavedCuration';
import type { TipData } from '@/shared/apis/tip/tipListApi';
import Header from '@/shared/components/common/Header';
import MyStoreList from '@/shared/components/keep/StoreList';
// import StoreCard from '@/shared/components/storecard/StoreCardInMultiPinList';

type tapIdx = '매장' | '리뷰' | 'Tip';
const Keep = () => {
  const navigate = useNavigate();

  const [currentIdx, setCurrentIdx] = useState<tapIdx>('매장');

  //fetchRestosData (저장된 매장만)
  // const [savedRestos, SetSavedRestos] = useState<SavedResto[]>();
  const [savedRestos, SetSavedRestos] = useState<SavedResto[]>();
  const refetchSavedRestaurants = useCallback(async () => {
    try {
      const res = await fetchSavedRestaurant();
      SetSavedRestos(res);
    } catch {
      console.error('저장한 식당 list API  호출 실패');
    }
  }, []);

  // 최초 1회 로딩
  useEffect(() => {
    refetchSavedRestaurants();
  }, [refetchSavedRestaurants]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchSavedRestaurant();
        console.log(res);
        console.log('저장한 식당 list API  호출 성공');
        SetSavedRestos(res);
      } catch {
        console.error('저장한 식당 list API  호출 실패');
      }
    };
    fetchData();
  }, []);

  //fetchTipData (저장된 tip만)
  const [savedTips, SetSavedTips] = useState<TipData[]>();

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

  return (
    <main className="px-4">
      <Header title="저장" type="back" backFn={() => navigate(-1)} />
      <div className="flex flex-col items-center justify-center">
        <div
          className="mb-2 flex h-[30px] min-w-full items-center justify-center gap-4 border-b px-6"
          style={{ width: 'calc(100% + 32px)' }}
        >
          <button
            onClick={() => setCurrentIdx('매장')}
            className={`h-full flex-1 border-x-0 border-b-2 border-t-0 border-solid ${currentIdx === '매장' ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
          >
            매장
          </button>
          <button
            onClick={() => setCurrentIdx('리뷰')}
            className={`h-full flex-1 border-x-0 border-b-2 border-t-0 border-solid ${currentIdx === '리뷰' ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
          >
            리뷰
          </button>
          <button
            onClick={() => setCurrentIdx('Tip')}
            className={`h-full flex-1 border-x-0 border-b-2 border-t-0 border-solid ${currentIdx === 'Tip' ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
          >
            Tip
          </button>
        </div>
        {currentIdx === '리뷰' ? (
          //저장한 리뷰 목록 -> restaurantId 받아올 수 있음.
          <Review />
        ) : currentIdx === '매장' ? (
          <>
            {/* keep된것만 map 필요 */}
            {/* {savedRestos &&
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
                    onUnbookmarked={refetchSavedRestaurants}
                  />
                );
              })} */}
            <MyStoreList />
          </>
        ) : (
          <>
            <SavedCuration tiplist={savedTips} />{' '}
          </>
        )}
      </div>
    </main>
  );
};
export default Keep;
