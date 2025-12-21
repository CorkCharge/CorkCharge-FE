import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import shakeHand from '@/shared/assets/images/shakehand.png';
import arrow from '@/shared/assets/left_arrow.svg';

function AboutServiceSection() {
  return (
    <>
      <p>코르크 차지의 콜키지 추가 방식은 매장에 직접 방문하여</p>
      <p>사장님과 함께 콜키지 비즈니스를 시작하는 방식입니다.</p>
      <p>‘해주세요 리스트’에 등록된 매장은 우선적으로</p>
      <p>콜키지 영업을 진행하게 됩니다.</p>
    </>
  );
}

function HowToUseSection() {
  const navigate = useNavigate();
  return (
    <>
      <p>콜키지 서비스를 원하는 매장을 선택해주세요!</p>
      <p>가게 클릭 시 해주세요가 요청됩니다.</p>

      <button
        className="mt-8 flex h-12 items-center gap-2 rounded-xl bg-[rgba(255,255,255,0.5)] px-5 font-semibold text-[var(--gray-8)]"
        onClick={() => navigate('/doit-list')}
      >
        해주세요 하러가기 <img src={arrow} className="h-4 w-[10px] rotate-180" />
      </button>
    </>
  );
}

const motionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Doit() {
  const navigate = useNavigate();

  const [isService, setIsService] = useState(true); // true: 해주세요란?, false: 해주세요 사용법

  useEffect(() => {
    const timer = setTimeout(() => setIsService(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative flex h-svh flex-col items-center justify-center px-4"
      style={{
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), radial-gradient(151% 149.45% at 9.19% 68.19%, #90212A 0%, #DCDBE8 70.67%), white',
      }}
    >
      <img
        src={arrow}
        className="absolute left-4 top-0 cursor-pointer"
        onClick={() => navigate('/home')}
      />
      <img src={shakeHand} className="size-[242px]" />
      <div className="mt-[54px] flex flex-col">
        <h3
          className="text-center text-xl font-bold text-white"
          onClick={() => setIsService((prev) => !prev)}
        >
          {isService ? '해주세요 서비스란' : '해주세요 사용법'}
        </h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={isService ? 'aboutService' : 'howToUse'}
            className="mt-2 flex h-40 flex-col items-center text-white"
            variants={motionVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {isService ? <AboutServiceSection /> : <HowToUseSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Doit;
