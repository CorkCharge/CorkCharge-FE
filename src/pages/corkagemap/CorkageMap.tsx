import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NaverMap from '@/shared/components/navermap/NaverMap';
import TopBarMap from '@/shared/components/topbar/TopBarMap';
import save from './save.svg';
import bttn from './filterImg.svg';
const CorkageMap = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

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
        <div
          onClick={() => navigate('filter')}
          className="flex h-[36px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-white/90 shadow-sm backdrop-blur-sm"
        >
          <img src={bttn} alt="필터링버튼" className="h-[14px] w-[18px]" />
          <p className="text-[14px] font-medium text-[#90212A]">원하는 콜키지 매장을 찾아봐요!</p>
        </div>

        <div
          onClick={() => setIsActive(!isActive)}
          className={`flex h-[36px] flex-[0.6] cursor-pointer items-center justify-center gap-2 rounded-full ${isActive ? 'bg-[#90212A] text-[#FFF]' : 'bg-white/90 text-[#90212A]'} shadow-sm backdrop-blur-sm`}
        >
          <img src={save} alt="저장표시" className="h-[14px] w-[16px]" />
          <p className="text-[14px] font-medium">저장한 매장</p>
        </div>
      </div>
    </main>
  );
};

export default CorkageMap;
