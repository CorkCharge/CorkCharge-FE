import V from './v.svg';
import StoreCard from '../../../shared/components/storecard/StoreCard'; // 경로 확인 필요

// 1. 사용할 마커 이미지들 import (경로 확인 필요)
import SaveMarker1 from '../list/savemarker/SaveMarker1.svg';
import SaveMarker2 from '../list/savemarker/SaveMarker2.svg';
import SaveMarker3 from '../list/savemarker/SaveMarker3.svg';
import SaveMarker4 from '../list/savemarker/SaveMarker4.svg';
import SaveMarker5 from '../list/savemarker/SaveMarker5.svg';
import SaveMarker6 from '../list/savemarker/SaveMarker6.svg';
import SaveMarker7 from '../list/savemarker/SaveMarker7.svg';
import SaveMarker8 from '../list/savemarker/SaveMarker8.svg';
import SaveMarker9 from '../list/savemarker/SaveMarker9.svg';
import SaveMarker10 from '../list/savemarker/SaveMarker10.svg';
import SaveMarker11 from '../list/savemarker/SaveMarker11.svg';
import SaveMarker12 from '../list/savemarker/SaveMarker12.svg';

import type { Group } from '../list/List';

// 마커 매핑 객체 (문자열 -> 이미지)
const bigMarkers: Record<string, string> = {
  SaveMarker1,
  SaveMarker2,
  SaveMarker3,
  SaveMarker4,
  SaveMarker5,
  SaveMarker6,
  SaveMarker7,
  SaveMarker8,
  SaveMarker9,
  SaveMarker10,
  SaveMarker11,
  SaveMarker12,
};

// Props 타입 정의
type MyStoreProps = {
  group: Group | null; // 부모로부터 받을 그룹 데이터
};

const MyStore = ({ group }: MyStoreProps) => {
  if (!group) return null; // 그룹 데이터 없으면 렌더링 안 함

  // 아이콘 이름으로 실제 이미지 찾기 (없으면 기본값 1번)
  const MarkerSrc = bigMarkers[group.iconName] || SaveMarker1;

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <img
        src={MarkerSrc}
        alt={group.iconName}
        className="absolute left-[40px] top-0 z-[100] h-[60px] w-[60px] -translate-y-1/2"
      />
      {/* 전체 규격: 393px x 852px 기준
         반응형 대응: h-full, w-full로 부모 컨테이너(바텀시트)에 맞춤
      */}

      {/* 헤더 영역 */}
      <div className="flex w-full items-center justify-between pl-[20px] pr-[22.8px] pt-[44px]">
        {/* 왼쪽: 타이틀 및 카운트 */}
        <div className="flex items-center gap-[8px]">
          <h1 className="text-[24px] font-[700] leading-none text-[#35353F]">내 장소</h1>
          <span className="text-[14px] font-[500] text-[#35353F]">{group.count}</span>
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
        {/* 나중에는 여기도 group.id를 이용해 실제 데이터를 불러와야함 */}
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
