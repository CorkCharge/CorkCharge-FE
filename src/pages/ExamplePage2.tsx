import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { PanInfo } from 'framer-motion';

// BottomSheet.tsx 컴포넌트 코드

// 바텀시트가 달라붙을 높이를 정의합니다. (vh 기준 숫자)
const SNAP_POINTS = {
  // 피그마 기준: 852px일 때 700px 높이 -> (852 - 700) = 152px 지점
  // vh로 변환: (152 / 852) * 100 = 약 17.8vh
  DEFAULT_TOP: 17.8, // 100vh - 700px (최대 높이)

  // 피그마 기준: 852px일 때 362px 높이 -> (852 - 362) = 490px 지점
  // vh로 변환: (490 / 852) * 100 = 약 57.5vh
  MID: 57.5, // 100vh - 362px (초기 높이)

  //피그마 기준: 852px일 때 132px 높이 -> (852 - 132) = 720px 지점
  MIN: 77.5, // 100vh - 132px (최소 높이)

  // 화면 밖
  HIDDEN: 100,
};

// 드래그 속도 임계값
const DRAG_VELOCITY_THRESHOLD = 500; // 휙- 스와이프 속도

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  topSnapVh?: number; // 최대 높이(vh)를 prop으로 받기 (opt)
}

// vh를 px로 변환하는 헬퍼 함수
const vhToPx = (vh: number) => {
  if (typeof window === 'undefined') return 0;
  return (window.innerHeight * vh) / 100;
};

const BottomSheet = ({
  isOpen,
  onClose,
  children,
  topSnapVh = SNAP_POINTS.DEFAULT_TOP,
}: BottomSheetProps) => {
  //y축 위치를 motionValue로 실시간 관리
  const y = useMotionValue(vhToPx(SNAP_POINTS.HIDDEN));
  //현재 스냅 상태 추적 (스크롤 충돌 방지용)
  const [currentSnap, setCurrentSnap] = useState<'TOP' | 'MID' | 'MIN'>('MID');

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
      // [수정] controls.start 대신 animate 함수로 y값을 직접 제어
      animate(y, snapPx.MID, {
        type: 'tween',
        duration: 0.4,
        ease: 'easeOut',
      });
      setCurrentSnap('MID');
    } else {
      animate(y, snapPx.HIDDEN, {
        type: 'tween',
        duration: 0.4,
        ease: 'easeOut',
      });
    }
  }, [isOpen, snapPx, y]);

  // 드래그 종료 시 호출되는 함수
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
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
        // [수정] animate, variants, transition 대신 style={{ opacity }} 사용
        style={{
          opacity,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'fixed',
          inset: 0,
          zIndex: 100, // 네비바(99)보다 높게
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* 2. 바텀시트 본체 */}
      <motion.div
        drag="y"
        onDragEnd={onDragEnd}
        // [수정] animate, transition, variants 대신 style={{ y }} 사용
        // y값이 motionValue이므로 드래그 시 실시간으로 반영됨
        style={{
          y,
          height: `calc(100vh - ${topSnapVh}vh)`, // 최대 높이
          touchAction: 'none', // 모바일에서 페이지 스크롤 방지
        }}
        // [수정] 드래그 경계를 최대(top)와 최소(bottom)로 설정
        dragConstraints={{
          top: snapPx.TOP,
          bottom: snapPx.MIN,
        }}
        // [수정] 드래그 탄성을 0으로 설정하여 경계에서 튕기지 않게 함
        dragElastic={{ top: 0, bottom: 0 }}
        className="fixed left-0 right-0 z-[101] flex w-full flex-col rounded-t-[20px] bg-white shadow-lg"
      >
        {/* 드래그 핸들 (회색 바) */}
        <div className="flex-shrink-0 cursor-grab py-4 active:cursor-grabbing">
          <div className="mx-auto h-[5px] w-[66px] rounded-full bg-[#D9D9D9]" />
        </div>

        {/* 바텀시트 내용물 */}
        {/* [수정] 스크롤 충돌 방지를 위해 overflow-y를 동적으로 제어 */}
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

// ==================================================================
// ExamplePage.tsx (사용 예시)
// ==================================================================

const ExamplePage2 = () => {
  // 바텀시트 열림/닫힘 상태를 부모에서 관리
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center">
      {/* 이 버튼을 클릭하면 바텀시트가 열립니다. */}
      <button
        onClick={() => setIsSheetOpen(true)}
        className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white"
      >
        바텀시트 열기
      </button>

      {/* 바텀시트 컴포넌트 */}
      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} topSnapVh={17.8}>
        {/* 이 안에 넣는 내용이 그대로 바텀시트에 표시됩니다.
          요청하신 '저장한 매장' 목록이나 '매장 상세' 내용을 여기에 넣으면 됩니다.
        */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">바텀시트 내용물</h2>
          <p>여기에 어떤 React 컴포넌트나 JSX 태그든 넣을 수 있습니다.</p>
          <div className="h-40 rounded-lg bg-gray-100 p-4">스크롤 테스트용 영역</div>
          <div className="h-40 rounded-lg bg-gray-100 p-4">스크롤 테스트용 영역</div>
          <div className="h-40 rounded-lg bg-gray-100 p-4">스크롤 테스트용 영역</div>
          <div className="h-40 rounded-lg bg-gray-100 p-4">스크롤 테스트용 영역</div>
        </div>
      </BottomSheet>
    </main>
  );
};

export default ExamplePage2;
