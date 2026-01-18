import { useEffect, useState, useRef } from 'react';
import { getClusterList } from '@/shared/apis/map/mapApi';
import StoreCardInMultiPinList from '../../../shared/components/storecard/StoreCardInMultiPinList';
import V from '../mystore/v.svg';
import type { ClusterRestaurant } from '@/shared/types/map';

interface MultipinListProps {
  restaurantIds: number[];
}
const SORT_OPTIONS = ['가격 낮은 순', '리뷰 많은 순', '리뷰 높은 순'];
const SORT_MAP: Record<string, string> = {
  '가격 낮은 순': 'PRICE_ASC',
  '리뷰 많은 순': 'REVIEW_COUNT_DESC',
  '리뷰 높은 순': 'RATING_DESC',
};

const MultipinList = ({ restaurantIds }: MultipinListProps) => {
  const [restaurants, setRestaurants] = useState<ClusterRestaurant[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('가격 낮은 순');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // [추가] 외부 클릭 시 드롭다운 닫기 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortClick = (option: string) => {
    // 1. 성능 최적화: 이미 선택된 옵션을 다시 누르면 아무것도 안 함 (리렌더링/API요청 방지)
    if (selectedSort === option) {
      setIsOpen(false);
      return;
    }

    // 2. 상태 변경 -> 이 변경이 아래 useEffect를 트리거함
    setSelectedSort(option);
    setIsOpen(false);
    console.log(`정렬 변경: ${option} -> API Key: ${SORT_MAP[option]}`);
  };

  useEffect(() => {
    if (!restaurantIds || restaurantIds.length === 0) return;

    const fetchList = async () => {
      try {
        const sortKey = SORT_MAP[selectedSort];
        console.log(`[API 요청 시작] IDs: ${restaurantIds.length}개, Sort: ${sortKey}`);

        // mapApi.ts에서 데이터 알맹이(ClusterListResponse)를 리턴하므로 바로 사용 가능
        const data = await getClusterList(restaurantIds, sortKey);
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
  }, [restaurantIds, selectedSort]);

  return (
    // [수정] 전체를 감싸는 하나의 부모 div 안에 내용을 배치합니다.
    <div className="relative flex h-full w-full flex-col bg-white">
      {/* 헤더 영역 (드롭다운) */}
      <div className="flex w-full items-center justify-between px-[15px] pt-[15px]">
        <span className="max-w-[160px] truncate text-[16px] font-[500] text-[#80818B]">
          {restaurants.length}개의 매장
        </span>
        {/* 오른쪽: 드롭다운 */}
        {/* 드롭다운 트리거 버튼 */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-[40px] max-w-[110px] cursor-pointer items-center justify-center gap-[2px] rounded-[20px] bg-[#F3F3F6] px-[12px] py-[6px]"
        >
          <span className="whitespace-nowrap text-[12px] font-[500] text-[#80818B]">
            {selectedSort}
          </span>
          <img
            src={V}
            alt="dropdown"
            className={`mt-[1px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-[15px] top-[60px] z-[100] flex w-[100px] flex-col items-center justify-center rounded-[16px] bg-white py-[10px]"
            style={{
              boxShadow:
                '0 4px 20px 0 rgba(58, 13, 16, 0.20), 0.318px 0.318px 2px 0 rgba(255, 255, 255, 0.30) inset',
              backdropFilter: 'blur(10px)',
            }}
          >
            {SORT_OPTIONS.map((option, index) => (
              <div key={option} className="flex w-full flex-col items-center">
                <div
                  onClick={() => handleSortClick(option)}
                  className={`cursor-pointer px-2 py-[6px] text-[12px] font-[500] transition-colors duration-200 ${
                    selectedSort === option
                      ? 'text-[#90212A]' // 선택된 항목 강조
                      : 'text-[#DBDDE1]'
                  } `}
                >
                  {option}
                </div>
                {/* 마지막 항목이 아닐 때만 구분선 표시 */}
                {index < SORT_OPTIONS.length - 1 && (
                  <div className="h-[1px] w-[80%] bg-[#DBDDE1]" />
                )}
              </div>
            ))}
          </div>
        )}
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
