import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NaverMap from '@/shared/components/navermap/NaverMap';
import TopBarMap from '@/shared/components/topbar/TopBarMap';
import BottomSheet from '@/shared/components/bottomsheet/BottomSheet';
import save from './save.svg';
import bttn from './filterImg.svg';
const CorkageMap = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setIsActive(false); // <-- 버튼 활성화 상태도 함께 false로 변경
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* 지도: 화면 전체 덮기 */}
      <div className="absolute inset-0 z-0">
        <NaverMap />
      </div>

      {/* 상단 검색바 */}
      <div className="absolute left-0 right-0 top-0 z-20 px-4 pt-2">
        <TopBarMap searchDisabled={false} />
      </div>

      {/* 검색바 아래 버튼 2개 */}
      <div className="absolute left-0 right-0 top-[72px] z-20 flex gap-2 px-4">
        <button
          onClick={() => navigate('filter')}
          className="flex h-[36px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-white/90 shadow-sm backdrop-blur-sm"
        >
          <img src={bttn} alt="필터링버튼" className="h-[14px] w-[18px]" />
          <p className="text-[14px] font-medium text-[#90212A]">원하는 콜키지 매장을 찾아봐요!</p>
        </button>

        <button
          onClick={() => {
            setIsSheetOpen(true);
            setIsActive(true);
          }}
          className={`flex h-[36px] flex-[0.6] cursor-pointer items-center justify-center gap-2 rounded-full ${isActive ? 'bg-[#90212A] text-[#FFF]' : 'bg-white/90 text-[#90212A]'} shadow-sm backdrop-blur-sm`}
        >
          <img src={save} alt="저장표시" className="h-[14px] w-[16px]" />
          <p className="text-[14px] font-medium">저장한 매장</p>
        </button>
      </div>
      <BottomSheet isOpen={isSheetOpen} onClose={handleSheetClose} topSnapVh={17.8}>
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

export default CorkageMap;
