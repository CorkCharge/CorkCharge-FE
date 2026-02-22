import { useState, useEffect } from 'react';
import Save from './save.svg';
import NotSave from './notsave.svg'; // 필요시 사용
import Share from './share.svg';
import Star from '../../assets/star.svg';
import DummyFood from './dummyFood.svg';
import useBookmarkStore from '@/shared/store/useBookmarkStore';
import GroupSelector from '@/shared/components/home/GroupSelector';
import GroupList from '@/shared/components/home/GroupList';
import { useNavigate } from 'react-router-dom';

interface StoreCardProps {
  restaurantId: number;
  name: string;
  rating: number;
  reviewCount: number;
  openingHoursText: string;
  imageUrls: string[];
  corkagePrice: string;
  corkageOption: string;
}

const StoreCardInSave = ({
  restaurantId,
  name,
  rating,
  reviewCount,
  openingHoursText,
  imageUrls,
  corkagePrice,
  corkageOption,
}: StoreCardProps) => {
  const [isKeep, setIsKeep] = useState(true);
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false); // 그룹 선택 바텀 시트 열기
  const navigate = useNavigate();
  const displayRating = Number(rating).toFixed(1);

  const selectedStores = useBookmarkStore((state) => state.selectedStores);

  const handleKeepClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 div로의 이벤트 전파를 막습니다.
    setIsGroupSelectorOpen(true);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 div로의 이벤트 전파를 막습니다.
    console.log('공유하기 클릭'); // 여기에 공유 로직 추가
  };

  useEffect(() => {
    setIsKeep(restaurantId in selectedStores);
  }, [restaurantId, selectedStores]);

  return (
    <div
      className="flex w-full cursor-pointer flex-col bg-white"
      onClick={() => navigate(`/detail-info/${restaurantId}`)}
    >
      {/* 1. 상단 정보 영역 (이름, 아이콘) */}
      <div className="relative flex w-full items-start justify-between pl-[17px]">
        {/* 식당 이름 */}
        <h2 className="text-[20px] font-bold leading-none text-[#35353F]">{name}</h2>
        {/* 우측 아이콘 버튼들 */}
        <div className="flex gap-[4px]">
          <button type="button">
            <img
              src={isKeep ? Save : NotSave}
              alt={isKeep ? 'saved' : 'unsaved'}
              onClick={handleKeepClick}
              className="h-[25px] w-[25px]"
            />
          </button>
          <button type="button" onClick={handleShareClick}>
            <img src={Share} alt="share" className="h-[25px] w-[25px]" />
          </button>
        </div>
      </div>

      {/* 2. 평점 및 영업 정보 */}
      <div className="mt-[4px] flex items-center pl-[17px]">
        <img src={Star} alt="star" className="h-[15px] w-[16px]" />

        {/* 평점 */}
        <span className="ml-[4px] text-[16px] font-[500] text-[#35353F]">{displayRating}</span>

        {/* 리뷰 수 */}
        <span className="ml-[4px] text-[14px] font-[500] text-[#9FA2AA]">({reviewCount})</span>

        {/* 구분 여백 */}
        <div className="ml-[9px] flex items-center gap-[4px]">
          {/* 영업 상태 */}
          <span className="text-[14px] font-[600] text-[#35353F]">영업중</span>
          {/* 영업 시간 */}
          <span className="text-[14px] font-[500] text-[#9FA2AA]">{openingHoursText}</span>
        </div>
      </div>

      {/* 3. 음식 이미지 리스트 (가로 스크롤 가능성 고려하여 flex-nowrap) */}
      <div className="mt-[9.5px] flex w-full gap-[5px] overflow-hidden pl-[17px]">
        {imageUrls && imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <img
              key={index}
              src={url || DummyFood}
              alt={`food-${index}`}
              className="h-[80px] w-[80px] rounded-[4px] object-cover"
            />
          ))
        ) : (
          <img
            src={DummyFood}
            alt="dummy"
            className="h-[80px] w-[80px] rounded-[4px] object-cover"
          />
        )}
      </div>

      {/* 4. 하단 정보 박스 (비용/기타) */}
      <div className="mt-[7.6px] flex h-[73px] w-full flex-col justify-center rounded-[16px] bg-[#F3F3F6] px-[17px]">
        {/* 비용 행 */}
        <div className="flex w-full items-center">
          <span className="min-w-fit text-[16px] font-[700] text-[#35353F]">비용</span>
          <span className="ml-[36.5px] truncate text-[14px] font-[500] text-[#35353F]">
            {corkagePrice}
          </span>
        </div>

        {/* 구분선 (width 329px 대응: 부모 padding 고려하면 거의 꽉 참) */}
        <div className="my-[8px] h-[1px] w-full bg-[#80818B] opacity-20" />

        {/* 기타 행 */}
        <div className="flex w-full items-center">
          <span className="min-w-fit text-[16px] font-[700] text-[#35353F]">기타</span>
          <span className="ml-[36.5px] truncate text-[14px] font-[500] text-[#35353F]">
            {corkageOption}
          </span>
        </div>
      </div>

      {/* [추가] Detail 안에서 GroupSelector 직접 렌더링 */}
      <div onClick={(e) => e.stopPropagation()}>
        <GroupSelector
          isOpen={isGroupSelectorOpen}
          topSnapVh={17.8}
          onClose={() => setIsGroupSelectorOpen(false)}
        >
          <GroupList
            onClose={() => setIsGroupSelectorOpen(false)}
            // 선택된 식당 상태에서 데이터를 가져와 전달
            restaurantName={name}
            restaurantId={restaurantId}
          />
        </GroupSelector>
      </div>
    </div>
  );
};

export default StoreCardInSave;
