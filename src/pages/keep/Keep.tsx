import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Review from './Review';
import { fetchSavedTip } from '@/shared/apis/bookmark/tipApi';
import SavedCuration from './SavedCuration';
import type { TipData } from '@/shared/apis/tip/tipListApi';
import Header from '@/shared/components/common/Header';
import MyStoreList from '@/shared/components/keep/StoreList';

type tapIdx = '매장' | '리뷰' | 'Tip';
const Keep = () => {
  const navigate = useNavigate();

  const [currentIdx, setCurrentIdx] = useState<tapIdx>('매장');

  //fetchTipData (저장된 tip만)
  const [savedTips, SetSavedTips] = useState<TipData[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchSavedTip();
        // console.log(res);
        SetSavedTips(res);
      } catch {
        console.error('저장한 tip list API  호출 실패');
      }
    };
    fetchData();
  }, []);

  return (
    <main className="">
      <div
        className="fixed top-0 z-[10] w-full bg-white px-4"
        style={{ maxWidth: 'var(--app-width)' }}
      >
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
        </div>
      </div>

      <div className="mt-[104px] px-4">
        {currentIdx === '리뷰' ? (
          //저장한 리뷰 목록
          <Review />
        ) : currentIdx === '매장' ? (
          <>
            {/* 가게 목록 */}
            <MyStoreList />
          </>
        ) : (
          <>
            {/* 팁 목록 */}
            <SavedCuration tiplist={savedTips} />
          </>
        )}
      </div>
    </main>
  );
};
export default Keep;
