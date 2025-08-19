// import React from 'react'
// import { fetchCorkageList } from '@/shared/apis/restaurant/corkageApi';
import CorkScore from './CorkScore';
import type { DayRange } from './types';
// import { useEffect, useState } from 'react';
// import { fetchCorkageScore, type CorkageScore } from '@/shared/apis/restaurant/corkageScoreApi';

type Props = { range: DayRange };

const CorkScoreList = ({ range }: Props) => {
  // const [corkage, setCorkage] = useState<CorkageScore[]>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetchCorkageScore();
  //       console.log(res);
  //       setCorkage(res);
  //     } catch (err) {
  //       console.error('API  호출 실패');
  //     }
  //   };
  //   fetchData();
  // }, []);

  //여기서 corkage 배열 중 createdAt 시간 계산해서 렌더링 필요

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <CorkScore
        name="엔비 햄버거"
        keep={27}
        rating={4.2}
        review="몰트향과 완벽하게 어우러지는 조화로운 페어링입니다."
        id="니콜라 테슬라"
        date="2025.01.01"
      />
      <CorkScore
        name="이가네 양꼬치"
        keep={83}
        rating={4.2}
        review="오랜만에 이가네~~ 양꼬치 커서 넘 조아효.."
        id="코룽이"
        date="2025.04.11"
      />
      <CorkScore
        name="신선술집 도원"
        keep={42}
        rating={4.2}
        review="데이트하기 좋아요! 한옥 느낌의 분위기가 좋고 안주 가성비도 좋아요."
        id="han**"
        date="2025.05.10"
      />
      <CorkScore
        name="로니로티"
        keep={27}
        rating={4.2}
        review="몰트향과 완벽하게 어우러지는 조화로운 페어링입니다."
        id="니콜라 테슬라"
        date="2025.01.01"
      />
      <CorkScore
        name="로니로티"
        keep={27}
        rating={4.2}
        review="몰트향과 완벽하게 어우러지는 조화로운 페어링입니다."
        id="니콜라 테슬라"
        date="2025.01.01"
      />
    </div>
  );
};

export default CorkScoreList;
