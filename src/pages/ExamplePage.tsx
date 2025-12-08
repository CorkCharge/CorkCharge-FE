import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { PanInfo } from 'framer-motion';

// ==================================================================
// BottomSheet.tsx 컴포넌트 코드
// (임포트 오류를 해결하기 위해 예제 파일에 직접 포함시켰습니다)
// ==================================================================

// 바텀시트가 "착" 달라붙을 높이를 정의합니다. (vh 기준)
const SNAP_POINTS = {
  // 피그마 기준: 852px일 때 700px 높이 -> (852 - 700) = 152px 지점
  // vh로 변환: (152 / 852) * 100 = 약 17.8vh
  TOP: 17.8, // 100vh - 700px (최대 높이)

  // 피그마 기준: 852px일 때 362px 높이 -> (852 - 362) = 490px 지점
  // vh로 변환: (490 / 852) * 100 = 약 57.5vh
  MID: 57.5, // 100vh - 362px (초기 높이)

  // [수정] 최소 높이 지점을 77.5vh로 변경합니다.
  MIN: 77.5,

  // 화면 밖
  HIDDEN: 100,
};

// 드래그 속도 임계값
const DRAG_VELOCITY_THRESHOLD = 800;

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const controls = useAnimation();
  const sheetRef = useRef<HTMLDivElement>(null);
  const [constraintsPx, setConstraintsPx] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    const calculateConstraints = () => {
      const vh = window.innerHeight;
      setConstraintsPx({
        top: vh * (SNAP_POINTS.TOP / 100),
        bottom: vh * (SNAP_POINTS.MIN / 100), // MIN 값(77.5)을 사용
      });
    };
    calculateConstraints();
    window.addEventListener('resize', calculateConstraints);
    return () => window.removeEventListener('resize', calculateConstraints);
  }, []);

  // [수정] 바텀시트 본체와 배경 오버레이를 위한 variants를 각각 정의합니다.
  const sheetVariants = {
    // [수정] vh 단위를 템플릿 리터럴로 추가
    hidden: { y: `${SNAP_POINTS.HIDDEN}vh` },
    snapMid: { y: `${SNAP_POINTS.MID}vh` },
    snapTop: { y: `${SNAP_POINTS.TOP}vh` },
    snapMin: { y: `${SNAP_POINTS.MIN}vh` },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    snapMid: { opacity: 0 }, // 중간 높이에서는 배경 투명
    snapTop: { opacity: 0.5 }, // 최대 높이에서만 배경 어둡게
    snapMin: { opacity: 0 },
  };

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
  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
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

    // 2. 느린 드래그 (위치 기반 스냅)
    // 현재 y 위치 가져오기
    const currentY = sheetRef.current ? sheetRef.current.getBoundingClientRect().y : 0;

    // 현재 vh 값 계산 (대략적)
    const currentVh = (currentY / window.innerHeight) * 100;

    // 각 스냅 지점의 중간값 계산
    const midPointTopMid = (SNAP_POINTS.TOP + SNAP_POINTS.MID) / 2;
    const midPointMidMin = (SNAP_POINTS.MID + SNAP_POINTS.MIN) / 2;
    const midPointMinClose = (SNAP_POINTS.MIN + SNAP_POINTS.HIDDEN) / 2;

    if (currentVh < midPointTopMid) {
      controls.start('snapTop'); // 최대 높이로
    } else if (currentVh < midPointMidMin) {
      controls.start('snapMid'); // 중간 높이로
    } else if (currentVh < midPointMinClose) {
      controls.start('snapMin'); // 최소 높이로
    } else {
      onClose(); // 닫기
    }
  };

  return (
    <>
      {/* 1. 뒷 배경 (어둡게 처리) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={overlayVariants}
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
        variants={sheetVariants}
        dragConstraints={{
          top: constraintsPx.top,
          bottom: constraintsPx.bottom,
        }} // 상단 경계만 설정
        dragElastic={{ top: 0, bottom: 0 }} // 드래그 범위 밖으로 얼마나 끌 수 있는지
        className="fixed left-0 right-0 z-[101] flex w-full flex-col rounded-t-[20px] bg-white shadow-lg"
        style={{
          height: `calc(100vh - ${SNAP_POINTS.TOP})`, // 최대 높이
          // y: SNAP_POINTS.HIDDEN, // 초기 위치
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

// ==================================================================
// ExamplePage.tsx (사용 예시)
// ==================================================================

const ExamplePage = () => {
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
      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
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

export default ExamplePage;
