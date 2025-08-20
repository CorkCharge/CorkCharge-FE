// import React from 'react'
// import { fetchCorkageList } from '@/shared/apis/restaurant/corkageApi';
import CorkScore from './CorkScore';
import type { DayRange } from './types';
import { useEffect, useState } from 'react';
import { fetchCorkageScore, type CorkageScore } from '@/shared/apis/restaurant/corkageScoreApi';

const CorkScoreList = ({ range }: { range: DayRange }) => {
  const [corkages, setCorkages] = useState<CorkageScore[]>();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetchCorkageScore({ range });
        if (!cancelled) {
          setCorkages(res);
          console.log('콜키지 스코어 api 호출 성공');
        }
      } catch (e) {
        console.error('API 호출 실패', e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [range]);

  const visible = corkages;

  //여기서 corkage 배열 중 createdAt 시간 계산해서 렌더링 필요
  return (
    <div className="mb-[60px] flex flex-col items-center justify-center gap-4">
      {/* {corkages &&
        corkages.map((corkage) => { */}
      {visible &&
        visible.map((corkage) => {
          return (
            <CorkScore
              reviewId={corkage.reviewId}
              restaurantName={corkage.restaurantName}
              userName={corkage.userName}
              content={corkage.content}
              rating={corkage.rating}
              createdAt={corkage.createdAt}
              imageUrl={corkage.imageUrl}
              bookmarkCount={corkage.bookmarkCount}
            />
          );
        })}
    </div>
  );
};

export default CorkScoreList;
