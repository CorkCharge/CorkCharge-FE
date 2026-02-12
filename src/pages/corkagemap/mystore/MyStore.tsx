import { useEffect, useState } from 'react';
import V from './v.svg';
import StoreCardInSave from '../../../shared/components/storecard/StoreCardInSave'; // 경로 확인 필요
import { getBookmarkGroupDetail } from '@/shared/apis/bookmark/bookmark.api';
import type { Group } from '../list/List';

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

interface StoredRestaurant {
  restaurantId: number;
  name: string;
  rating: number;
  reviewCount: number;
  openingHoursText: string;
  imageUrls: string[];
  corkagePrice: string;
  corkageOption: string;
}

const MyStore = ({ group }: MyStoreProps) => {
  const [restaurants, setRestaurants] = useState<StoredRestaurant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!group) return;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        // [API 연동] 특정 그룹 내용 조회 (기본 정렬: 최신순)
        const res = await getBookmarkGroupDetail(group.id, 'LATEST');
        if (res.success) {
          setRestaurants(res.data.restaurants);
        }
      } catch (error) {
        console.error('그룹 상세 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [group?.id]);

  if (!group) return null; // 그룹 데이터 없으면 렌더링 안 함

  // 아이콘 이름으로 실제 이미지 찾기 (없으면 기본값 1번)
  const MarkerSrc = bigMarkers[group.iconName] || SaveMarker1;

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      {/* 헤더 영역 */}
      <div className="flex w-full items-center justify-between pl-[20px] pr-[22.8px]">
        {/* 왼쪽: 타이틀 및 카운트 */}
        <div className="flex items-center gap-[8px]">
          <img src={MarkerSrc} alt={group.iconName} className="z-[100] h-[40px] w-[40px]" />
          <h1 className="text-[24px] font-[700] leading-none text-[#35353F]">{group.name}</h1>
          <span className="text-[14px] font-[500] text-[#35353F]">{group.count}</span>
        </div>

        {/* 오른쪽: 드롭다운 */}
        <div className="flex h-[40px] w-[89.2px] cursor-pointer items-center justify-center gap-[2px] rounded-[20px] bg-[#F3F3F6] px-[8px] py-[6px]">
          <span className="text-[12px] font-[500] text-[#80818B]">리뷰많은순</span>
          <img src={V} alt="dropdown" className="mt-[1px]" />
        </div>
      </div>

      {/* 리스트 영역 (스크롤) */}
      {/* 헤더 아래 24px 여백, 좌우 15px 여백 */}
      <div className="mt-[24px] flex flex-1 flex-col gap-[24px] overflow-y-auto px-[15px] pb-[40px] [&::-webkit-scrollbar]:hidden">
        {/* 나중에는 여기도 group.id를 이용해 실제 데이터를 불러와야함 */}
        {loading ? (
          <div className="flex h-40 items-center justify-center text-gray-400">불러오는 중...</div>
        ) : restaurants.length > 0 ? (
          restaurants.map((rest) => (
            <StoreCardInSave
              key={rest.restaurantId}
              restaurantId={rest.restaurantId}
              currentGroupId={group.id}
              name={rest.name}
              rating={rest.rating}
              reviewCount={rest.reviewCount}
              openingHoursText={rest.openingHoursText}
              imageUrls={rest.imageUrls}
              corkagePrice={rest.corkagePrice}
              corkageOption={rest.corkageOption}
            />
          ))
        ) : (
          <div className="flex h-40 items-center justify-center text-gray-400">
            저장된 매장이 없습니다.
          </div>
        )}
        {/* 스크롤 확인용 더미 데이터 추가 가능 */}
      </div>
    </div>
  );
};

export default MyStore;
