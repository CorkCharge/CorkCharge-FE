import { useState, useEffect } from 'react';

import ProgressDots from './ProgressDots';
import hotNow from '@/shared/components/onBoarding/images/hot-now.png';
import numerodos from '@/shared/components/onBoarding/images/numerodos-store.png';
import newWave from '@/shared/components/onBoarding/images/new-wave-store.png';
import mayvile from '@/shared/components/onBoarding/images/mayvile-store.png';
import Button from '../common/Button';

function AboutHotStore({ onNext }: { onNext: React.Dispatch<React.SetStateAction<number>> }) {
  const [isSmallView, setIsSmallView] = useState(false);

  useEffect(() => {
    checkView();
    window.addEventListener('resize', checkView);
    return () => window.removeEventListener('resize', checkView);
  }, []);

  const checkView = () => setIsSmallView(window.innerWidth < 405);

  return (
    <div className="relative">
      <span className="absolute right-8 top-[50px] text-[var(--corkcharge-gray)] underline underline-offset-4">
        SKIP
      </span>
      <ProgressDots total={4} now={3} color={'var(--corkcharge-gray)'} className="pt-[60px]" />

      <div className="mx-auto w-[70%]">
        <h1 className="mt-11 text-center text-3xl font-bold">
          <p>코르크차지의</p>
          <p>
            콜키지 발굴 방법 <span className="align-super text-sm">1</span>
          </p>
        </h1>
        <h2 className="mt-7 text-center font-medium text-[#585A68]">
          <p>저장 수가 임박한 매장은</p>
          <p>지금 핫한 매장 상단에 위치해요!</p>
        </h2>
        <div className="mt-2 flex flex-col items-center">
          <img src={hotNow} className="w-full" />
          <div className="relative h-10 w-full">
            <img src={numerodos} className="absolute left-1/2 top-0 z-10 w-full -translate-x-1/2" />
            <img
              src={newWave}
              className="absolute left-1/2 z-[8] w-[99%] -translate-x-1/2 translate-y-1/4"
            />
            <img
              src={mayvile}
              className="absolute left-1/2 z-[6] w-[103%] -translate-x-1/2 translate-y-[36%]"
            />
            <div className="absolute left-1/2 z-[4] w-[103%] -translate-x-1/2 translate-y-[44%]">
              <img src={mayvile} className="w-full" />
              {!isSmallView && <Button value="다음" className="-ml-[7%] mb-4 w-[114%]" />}
            </div>
          </div>
        </div>
      </div>
      {isSmallView && (
        <div className="fixed bottom-8 w-full text-center">
          <Button
            value="다음"
            className="w-4/5"
            onClick={() => {
              onNext((prev) => prev + 1);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default AboutHotStore;
