import { useEffect, useState } from 'react';

import Button from '../common/Button';
import ProgressDots from './ProgressDots';
import shakehand from '@/shared/assets/images/shakehand.png';

function AboutPlease({ onNext }: { onNext: () => void }) {
  const [isSmallView, setIsSmallView] = useState(false);

  useEffect(() => {
    checkView();
    window.addEventListener('resize', checkView);
    return () => window.removeEventListener('resize', checkView);
  }, []);

  const checkView = () => setIsSmallView(window.innerWidth < 405);
  return (
    <div>
      <ProgressDots total={4} now={4} color={'var(--gray-5)'} className="pt-[60px]" />
      <h1 className="mt-11 text-center text-3xl font-bold">
        <p>코르크차지의</p>
        <p>
          콜키지 발굴 방법 <span className="align-super text-sm">2</span>
        </p>
      </h1>
      <h2 className="mt-7 text-center font-medium text-[#585A68]">
        <p>해주세요에서 직접적인 요청이 가능합니다</p>
      </h2>
      <div
        className="bg-gradient mt-[50px] flex justify-center"
        style={{
          background:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.40) 100%), radial-gradient(151% 149.45% at -10.81% 68.19%, #90212A 0%, #DCDBE8 70.67%)',
        }}
      >
        <img src={shakehand} className="w-[62%]" />
      </div>
      <div className="mx-auto flex w-[84%] flex-col gap-1">
        <p className="font-bold">해주세요 서비스란?</p>
        <p className="text-sm font-medium text-[#35353F]">
          코르크 차지의 콜키지 추가 방식은 매장에 직접 방문하여 사장님과 함께 콜키지 비즈니스를
          시작하는 방식입니다. ‘해주세요 리스트’에 등록된 매장은 우선적으로 콜키지 영업을 진행하게
          됩니다.
        </p>
        {!isSmallView && <Button value="다음" className="mt-2" onClick={onNext} />}
      </div>
      {isSmallView && (
        <div className="fixed bottom-8 mx-auto w-full max-w-[600px] text-center">
          <Button value="다음" className="w-[80%]" onClick={onNext} />
        </div>
      )}
    </div>
  );
}

export default AboutPlease;
