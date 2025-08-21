import { useNavigate } from 'react-router-dom';
import NaverMap from '@/shared/components/navermap/NaverMap';
import TopBarMap from '@/shared/components/topbar/TopBarMap';
import bttn from './filterImg.svg';
const CorkageMap = () => {
  const navigate = useNavigate();
  return (
    <main className="relative">
      <div className="absolute left-0 right-0 z-10">
        <TopBarMap searchDisabled={false} />
      </div>
      <div
        className="absolute left-[13%] top-[7%] z-10 flex h-[32px] w-[300px] cursor-pointer flex-row items-center justify-center gap-[7px] rounded-[20px] bg-white/85"
        onClick={() => navigate('filter')}
      >
        <img src={bttn} alt="필터링버튼" className="h-[13px] w-[18px]" />
        <p className="text-[14px] font-[500] text-[#90212A]">원하는 콜키지 매장을 찾아봐요!</p>
      </div>
      <NaverMap />
    </main>
  );
};

export default CorkageMap;
