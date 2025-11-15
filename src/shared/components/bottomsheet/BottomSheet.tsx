import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { PanInfo } from 'framer-motion';

// 바텀시트가 "착" 달라붙을 높이를 정의합니다. (vh 기준)
const SNAP_POINTS = {
  // 피그마 기준: 852px일 때 700px 높이 -> (852 - 700) = 152px 지점
  // vh로 변환: (152 / 852) * 100 = 약 17.8vh
  TOP: '17.8vh', // 100vh - 700px (최대 높이)

  // 피그마 기준: 852px일 때 362px 높이 -> (852 - 362) = 490px 지점
  // vh로 변환: (490 / 852) * 100 = 약 57.5vh
  MID: '57.5vh', // 100vh - 362px (초기 높이)

  // 화면 밖
  HIDDEN: '100vh',
};

// 드래그 속도 임계값
const DRAG_VELOCITY_THRESHOLD = 500;

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const controls = useAnimation();
  const sheetRef = useRef<HTMLDivElement>(null);

  // isOpen 상태가 변경될 때 애니메이션 실행
  useEffect(() => {
    if (isOpen) {
      // 열릴 때는 중간 높이로 스냅
      controls.start('snapMid');
    } else {
      // 닫힐 때는 화면 밖으로
      controls.start('hidden');
    }
  }, [isOpen, controls]);

  // 드래그 종료 시 호출되는 함수
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { velocity } = info;

    // 아래로 빠르게 쓸어내리면 닫기
    if (velocity.y > DRAG_VELOCITY_THRESHOLD) {
      onClose();
      return;
    }

    // 위로 빠르게 쓸어올리면 최대 높이로
    if (velocity.y < -DRAG_VELOCITY_THRESHOLD) {
      controls.start('snapTop');
      return;
    }

    // 현재 y 위치 가져오기
    const currentY = sheetRef.current ? sheetRef.current.getBoundingClientRect().y : 0;

    // 현재 vh 값 계산 (대략적)
    const currentVh = (currentY / window.innerHeight) * 100;

    // 중간 지점(top과 mid의 중간) 계산
    // (17.8 + 57.5) / 2 = 약 37.6
    const midPoint = (parseFloat(SNAP_POINTS.TOP) + parseFloat(SNAP_POINTS.MID)) / 2;

    if (currentVh < midPoint) {
      // 중간 지점보다 높으면 -> 최대 높이로 스냅
      controls.start('snapTop');
    } else {
      // 중간 지점보다 낮으면 -> 중간 높이로 스냅
      controls.start('snapMid');
    }
  };

  return (
    <>
      {/* 1. 뒷 배경 (어둡게 처리) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* 2. 바텀시트 본체 */}
      <motion.div
        ref={sheetRef}
        drag="y" // y축으로만 드래그 가능
        onDragEnd={onDragEnd}
        initial="hidden"
        animate={controls}
        transition={{
          type: 'spring',
          damping: 30, // 스프링의 튕김 정도
          stiffness: 400, // 스프링의 강도
        }}
        variants={{
          hidden: { y: SNAP_POINTS.HIDDEN },
          snapMid: { y: SNAP_POINTS.MID },
          snapTop: { y: SNAP_POINTS.TOP },
        }}
        dragConstraints={{ top: 0 }} // 상단 경계만 설정
        dragElastic={0.1} // 드래그 범위 밖으로 얼마나 끌 수 있는지
        className="fixed left-0 right-0 z-50 flex w-full flex-col rounded-t-[20px] bg-white shadow-lg"
        style={{
          height: `calc(100vh - ${SNAP_POINTS.TOP})`, // 최대 높이
          y: SNAP_POINTS.HIDDEN, // 초기 위치
          touchAction: 'none', // 모바일에서 페이지 스크롤 방지
        }}
      >
        {/* 드래그 핸들 (회색 바) */}
        <div className="flex-shrink-0 cursor-grab py-4 active:cursor-grabbing">
          <div className="mx-auto h-[5px] w-[66px] rounded-full bg-[#D9D9D9]" />
        </div>

        {/* 바텀시트 내용물 */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
      </motion.div>
    </>
  );
};

export default BottomSheet;
