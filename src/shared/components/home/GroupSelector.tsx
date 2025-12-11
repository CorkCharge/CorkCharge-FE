import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { PanInfo } from 'framer-motion';

// 높이 (vh)
const SNAP_POINTS = {
  DEFAULT_TOP: 17.8, // 100vh - 700px (최대 높이)
  MID: 57.5,
  MIN: 77.5,
  HIDDEN: 100,
};

// 드래그 속도 임계값
const DRAG_VELOCITY_THRESHOLD = 500;

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  topSnapVh?: number; // 최대 높이(vh)
}

// vh를 px로 변환하는 헬퍼 함수
const vhToPx = (vh: number) => {
  if (typeof window === 'undefined') return 0;
  return (window.innerHeight * vh) / 100;
};

const GroupSelector = ({
  isOpen,
  onClose,
  children,
  topSnapVh = SNAP_POINTS.DEFAULT_TOP,
}: BottomSheetProps) => {
  //y축 위치를 motionValue로 실시간 관리
  const y = useMotionValue(vhToPx(SNAP_POINTS.HIDDEN));
  //현재 스냅 상태 추적 (스크롤 충돌 방지용)
  const [currentSnap, setCurrentSnap] = useState<'TOP' | 'MID' | 'MIN'>('MIN');

  //화면 크기 변경 시 스냅 지점(px)을 다시 계산하기 위한 상태
  const [snapPx, setSnapPx] = useState(() => ({
    TOP: vhToPx(topSnapVh),
    MID: vhToPx(SNAP_POINTS.MID),
    MIN: vhToPx(SNAP_POINTS.MIN),
    HIDDEN: vhToPx(SNAP_POINTS.HIDDEN),
  }));

  //화면 크기가 변경되면 스냅 지점(px)을 다시 계산
  useEffect(() => {
    const calculateSnapPx = () => {
      setSnapPx({
        TOP: vhToPx(topSnapVh),
        MID: vhToPx(SNAP_POINTS.MID),
        MIN: vhToPx(SNAP_POINTS.MIN),
        HIDDEN: vhToPx(SNAP_POINTS.HIDDEN),
      });
    };
    window.addEventListener('resize', calculateSnapPx);
    return () => window.removeEventListener('resize', calculateSnapPx);
  }, []);

  //배경 오버레이 투명도를 y값에 따라 실시간으로 변경
  const opacity = useTransform(y, [snapPx.TOP, snapPx.MID], [0.5, 0]);

  // isOpen 상태가 변경될 때 애니메이션 실행
  useEffect(() => {
    if (isOpen) {
      animate(y, snapPx.TOP, {
        type: 'tween',
        duration: 0.4,
        ease: 'easeOut',
      });
      setCurrentSnap('TOP');
    } else {
      animate(y, snapPx.HIDDEN, {
        type: 'tween',
        duration: 0.4,
        ease: 'easeOut',
      });
    }
  }, [isOpen, snapPx, y]);

  // 드래그 종료 시 호출되는 함수
  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { velocity } = info;

    // 1. 빠른 플릭(flick) 제스처 감지
    if (velocity.y > DRAG_VELOCITY_THRESHOLD) {
      onClose(); // (useEffect[isOpen]이 y를 HIDDEN으로 애니메이션함)
      return;
    }
    if (velocity.y < -DRAG_VELOCITY_THRESHOLD) {
      animate(y, snapPx.TOP, { type: 'tween', duration: 0.3, ease: 'easeOut' });
      setCurrentSnap('TOP');
      return;
    }

    // 2. 느린 드래그 (위치 기반 스냅)
    const currentY = y.get(); // 현재 y 픽셀 값

    // 각 스냅 지점의 중간값 계산
    const midPointTopMid = (snapPx.TOP + snapPx.MID) / 2;
    const midPointMidMin = (snapPx.MID + snapPx.MIN) / 2;
    const midPointMinClose = (snapPx.MIN + snapPx.HIDDEN) / 2;

    if (currentY < midPointTopMid) {
      animate(y, snapPx.TOP, { type: 'tween', duration: 0.3, ease: 'easeOut' });
      setCurrentSnap('TOP');
    } else if (currentY < midPointMidMin) {
      animate(y, snapPx.MID, { type: 'tween', duration: 0.3, ease: 'easeOut' });
      setCurrentSnap('MID');
    } else if (currentY < midPointMinClose) {
      animate(y, snapPx.MIN, { type: 'tween', duration: 0.3, ease: 'easeOut' });
      setCurrentSnap('MIN');
    } else {
      onClose(); // (useEffect[isOpen]이 y를 HIDDEN으로 애니메이션함)
    }
  };

  return (
    <>
      {/* 1. 뒷 배경 (어둡게 처리) */}
      <motion.div
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          opacity,
        }}
        className={`fixed inset-0 z-[100] bg-black ${isOpen ? 'auto' : 'none'}`}
        onClick={onClose}
      />

      {/* 2. 바텀시트 본체 */}
      <motion.div
        drag="y"
        onDragEnd={onDragEnd}
        style={{
          y,
          x: '-50%',
          height: `calc(100vh - ${topSnapVh}vh)`, // 최대 높이
          touchAction: 'none', // 모바일에서 페이지 스크롤 방지
        }}
        dragConstraints={{
          top: snapPx.TOP,
          bottom: snapPx.MIN,
        }}
        dragElastic={{ top: 0, bottom: 0 }}
        className="fixed left-1/2 top-0 z-[101] flex w-full max-w-[var(--app-width)] flex-col rounded-t-[20px] bg-white shadow-lg"
      >
        {/* 드래그 핸들 (회색 바) */}
        <div className="flex-shrink-0 cursor-grab py-4 active:cursor-grabbing">
          <div className="mx-auto h-[5px] w-[66px] rounded-full bg-[#D9D9D9]" />
        </div>

        {/* 바텀시트 내용물 */}
        <div
          className="flex-1 px-6 pb-6"
          style={{
            overflowY: currentSnap === 'TOP' ? 'auto' : 'hidden',
          }}
        >
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default GroupSelector;
