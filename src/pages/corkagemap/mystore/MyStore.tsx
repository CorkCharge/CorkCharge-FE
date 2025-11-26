import V from './v.svg';
import StoreCard from '../../../shared/components/storecard/StoreCard'; // 경로 확인 필요
import Marker from '../list/savemarker/SaveMarker2.svg';
const MyStore = () => {
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <img
        src={Marker}
        className="absolute left-[40px] top-0 z-10 h-[60px] w-[60px] -translate-y-1/2"
      />
      {/* 전체 규격: 393px x 852px 기준
         반응형 대응: h-full, w-full로 부모 컨테이너(바텀시트)에 맞춤
      */}

      {/* 헤더 영역 */}
      <div className="flex w-full items-center justify-between pl-[20px] pr-[22.8px] pt-[44px]">
        {/* 왼쪽: 타이틀 및 카운트 */}
        <div className="flex items-center gap-[8px]">
          <h1 className="text-[24px] font-[700] leading-none text-[#35353F]">내 장소</h1>
          <span className="text-[14px] font-[500] text-[#35353F]">49</span>
        </div>

        {/* 오른쪽: 드롭다운 */}
        <div className="flex h-[40px] w-[89.2px] cursor-pointer items-center justify-center gap-[2px] rounded-[20px] bg-[#F3F3F6] px-[8px] py-[6px]">
          <span className="text-[12px] font-[500] text-[#80818B]">가격낮은순</span>
          <img src={V} alt="dropdown" className="mt-[1px]" />
        </div>
      </div>

      {/* 리스트 영역 (스크롤) */}
      {/* 헤더 아래 24px 여백, 좌우 15px 여백 */}
      <div className="mt-[24px] flex flex-1 flex-col gap-[24px] overflow-y-auto px-[15px] pb-[40px] [&::-webkit-scrollbar]:hidden">
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        {/* 스크롤 확인용 더미 데이터 추가 가능 */}
      </div>
    </div>
  );
};

export default MyStore;
