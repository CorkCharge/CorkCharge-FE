import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClusterList } from '@/shared/apis/map/mapApi';
import StoreCardInMultiPinList from '../../../shared/components/storecard/StoreCardInMultiPinList';
import V from '../mystore/v.svg';
import type { ClusterRestaurant } from '@/shared/types/map';

interface MultipinListProps {
  restaurantIds: number[];
}

const MultipinList = ({ restaurantIds }: MultipinListProps) => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<ClusterRestaurant[]>([]);

  useEffect(() => {
    if (!restaurantIds || restaurantIds.length === 0) return;

    const fetchList = async () => {
      try {
        console.log('[API 요청 시작] 전달받은 IDs:', restaurantIds);

        // mapApi.ts에서 데이터 알맹이(ClusterListResponse)를 리턴하므로 바로 사용 가능
        const data = await getClusterList(restaurantIds);
        console.log('[API 응답 도착] 서버 데이터:', data);
        if (data && data.restaurants) {
          console.log('[State 설정] 목록 개수:', data.restaurants.length);
          setRestaurants(data.restaurants);
        } else {
          console.warn('데이터 형식이 예상과 다릅니다:', data);
        }
      } catch (e) {
        console.error('[MultipinList] API Error:', e);
      }
    };

    fetchList();
  }, [restaurantIds]);

  return (
    // [수정] 전체를 감싸는 하나의 부모 div 안에 내용을 배치합니다.
    <div className="relative flex h-full w-full flex-col bg-white">
      {/* 헤더 영역 (드롭다운) */}
      <div className="flex w-full items-center justify-between px-[15px] pt-[15px]">
        <span className="max-w-[160px] truncate text-[16px] font-[500] text-[#80818B]">
          {restaurants.length}개의 매장
        </span>
        {/* 오른쪽: 드롭다운 */}
        <div className="flex h-[40px] max-w-[100px] cursor-pointer items-center justify-center gap-[2px] rounded-[20px] bg-[#F3F3F6] px-[8px] py-[6px]">
          <span className="text-[12px] font-[500] text-[#80818B]">가격 낮은 순</span>
          <img src={V} alt="dropdown" className="mt-[1px]" />
        </div>
      </div>

      {/* 리스트 영역 (스크롤) */}
      {/* 헤더 아래 24px 여백, 좌우 15px 여백 */}
      <div className="mt-[24px] flex flex-1 flex-col gap-[24px] overflow-y-auto px-[15px] pb-[40px] [&::-webkit-scrollbar]:hidden">
        {restaurants.length > 0 ? (
          restaurants.map((r) => (
            <StoreCardInMultiPinList
              key={r.restaurantId}
              resId={r.restaurantId}
              name={r.name}
              address={r.address}
              rating={r.rating}
              reviewCount={r.reviewCount}
              scrap={r.scrap}
              corkagePrice={r.corkagePrice}
              corkageOptions={r.corkageOptions}
              imageUrls={r.imageUrls}
              openingHours={r.openingHours}
              onClick={() => navigate(`/detail-info/${r.restaurantId}`)}
            />
          ))
        ) : (
          // 데이터 로딩 중이거나 없을 때 표시할 UI (옵션)
          <div className="flex h-full items-center justify-center text-gray-400">
            불러오는 중...
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipinList;
