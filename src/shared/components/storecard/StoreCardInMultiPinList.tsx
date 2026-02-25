import { useState, useEffect } from 'react';
import Save from './save.svg';
import NotSave from './notsave.svg'; // 필요시 사용
import Share from './share.svg';
import Star from '../../assets/star.svg';
import DummyFood from './dummyFood.svg';
import { useNavigate } from 'react-router-dom';
import useBookmarkStore from '@/shared/store/useBookmarkStore';
import GroupSelector from '../home/GroupSelector';
import GroupList from '../home/GroupList';
import Modal from '../common/Modal';
import Button from '../common/Button';
import check from '../../components/detail/assets/check.svg';
import logo from '@/shared/assets/images/logo.svg';
import MultiSaveMarker from '../../assets/common/multiSaveMarker.svg';

// [수정] API 데이터 타입에 맞춰 Props 인터페이스 정의
interface StoreCardProps {
  resId: number;
  name: string;
  rating: number;
  reviewCount: number;
  address: string; // 필요하다면 UI에 추가
  scrap: boolean;
  corkagePrice: string;
  corkageOptions: string[];
  imageUrls: string[];
  openingHours: string;
}

const StoreCard = ({
  resId,
  name,
  rating,
  reviewCount,
  scrap,
  corkagePrice,
  corkageOptions,
  imageUrls,
  openingHours,
}: StoreCardProps) => {
  const displayRating = Number(rating).toFixed(1);
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // 공유하기 modal 열기
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기
  const selectedStores = useBookmarkStore((state) => state.selectedStores);
  // 이미지 로드 에러 시 처리를 위한 핸들러
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DummyFood; // 에러 시 더미 이미지로 대체
  };

  const handleKeepClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 div로의 이벤트 전파를 막습니다.
    setIsGroupSelectorOpen(true);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 div로의 이벤트 전파를 막습니다.
    setIsShareModalOpen(true);
  };

  // 공유 클릭 시 주소 복사
  const clipLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/detail-info/${resId}`); // 해당 매장의 상세정보 페이지 주소를 복사
    setIsShareModalOpen(false);
    setIsCopiedModalOpen(true);
    setTimeout(() => setIsCopiedModalOpen(false), 1000);
  };

  const navigate = useNavigate();
  const [isKeep, setIsKeep] = useState(scrap);

  useEffect(() => {
    // 사용자가 현재 세션에서 한 번이라도 조작을 해서 스토어에 데이터가 담겼는지 확인
    const hasUserAction = resId in selectedStores;

    if (hasUserAction) {
      // 조작 이력이 있다면 스토어의 최신 상태를 반영
      setIsKeep(selectedStores[resId].length > 0);
    } else {
      // 조작 이력이 없다면 초기 서버 데이터(scrap)를 신뢰함
      setIsKeep(scrap);
    }
  }, [resId, selectedStores, scrap]);

  // [해결 2] 그룹 셀렉터가 닫힐 때 최신 상태 확정
  const handleCloseGroupSelector = () => {
    setIsGroupSelectorOpen(false);
    // 닫히는 시점의 스토어 상태를 다시 한번 동기화
    if (resId in selectedStores) {
      setIsKeep(selectedStores[resId].length > 0);
    }
  };

  const getMarkerIcon = () => {
    const groupIds = selectedStores[resId];

    // 1. 스토어에 이 매장에 대한 기록이 아예 없는 경우 (초기 로딩 상태)
    if (!groupIds) {
      // 초기 scrap 여부(isKeep)에 따라 아이콘을 보여줌
      return isKeep ? Save : NotSave;
    }

    // 2. 사용자가 조작하여 그룹이 0개가 된 경우
    if (groupIds.length === 0) {
      return NotSave;
    }

    // 3. 2개 이상의 그룹에 저장된 경우
    if (groupIds.length >= 2) {
      return MultiSaveMarker;
    }

    // 4. 1개의 그룹에 저장된 경우
    return Save;
  };

  return (
    <div
      className="flex w-full flex-col bg-white"
      onClick={() => navigate(`/detail-info/${resId}`)}
    >
      {/* 1. 상단 정보 영역 (이름, 아이콘) */}
      <div className="relative flex w-full items-start justify-between pl-[17px]">
        {/* 식당 이름 */}
        <h2 className="text-[20px] font-bold leading-none text-[#35353F]">{name}</h2>
        {/* 우측 아이콘 버튼들 */}
        <div className="flex gap-[4px]">
          <button type="button" onClick={handleKeepClick}>
            {/* scrap ? Save : NotSave */}
            <img
              src={getMarkerIcon()}
              alt={isKeep ? 'saved' : 'unsaved'}
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
          {/* 영업 시간 => openingHours */}
          <span className="max-w-[120px] truncate text-[14px] font-[500] text-[#9FA2AA]">
            {openingHours}
          </span>
        </div>
      </div>

      {/* 3. 음식 이미지 리스트 => mainImageUrls */}
      <div className="mt-[9.5px] flex w-full gap-[5px] overflow-hidden pl-[17px]">
        {imageUrls && imageUrls.length > 0 ? (
          imageUrls
            .slice(0, 4)
            .map((url, index) => (
              <img
                key={index}
                src={url}
                onError={handleImageError}
                alt={`${name}-food-${index}`}
                className="h-[80px] w-[80px] rounded-[4px] object-cover"
              />
            ))
        ) : (
          // 이미지가 없을 경우 더미 표시
          <img
            src={DummyFood}
            alt="no-image"
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
          <span className="ml-[36.5px] line-clamp-2 text-[14px] font-[500] text-[#35353F]">
            {corkageOptions?.join(', ')}
          </span>
        </div>
      </div>

      {/* 공유하기 모달 */}
      <div onClick={(e) => e.stopPropagation()}>
        <Modal
          isOpen={isShareModalOpen}
          hasCloseButton={true}
          onClose={() => setIsShareModalOpen(false)}
        >
          <div className="mb-4 flex items-center">
            <img src={logo} className="h-[22px] w-[13px]" />
            <div className="ml-3 flex flex-col">
              <span className="font-semibold">{name}</span>
              <span className="text-xs text-[rgba(60,60,67,0.6)]">corkcharge.com</span>
            </div>
          </div>
          <Button
            value="링크 복사하기"
            className="bg-[var(--gray-1)] text-[var(--gray-8)] shadow-none"
            onClick={clipLink}
          />
        </Modal>
      </div>

      {/* 복사완료 모달 */}
      {isCopiedModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/50">
          <div className="absolute top-12 flex h-12 w-[125px] items-center justify-center rounded-xl bg-white p-6 font-semibold text-[var(--primary)] shadow-lg">
            <img src={check} />
          </div>
        </div>
      )}

      <div onClick={(e) => e.stopPropagation()}>
        {/* [추가] 카드별로 독립적인 GroupSelector 배치 */}
        <GroupSelector
          isOpen={isGroupSelectorOpen}
          topSnapVh={17.8}
          onClose={handleCloseGroupSelector}
        >
          {isGroupSelectorOpen && (
            <GroupList
              key={`group-list-${resId}-${isGroupSelectorOpen}`}
              onClose={handleCloseGroupSelector}
              restaurantName={name}
              restaurantId={resId}
            />
          )}
        </GroupSelector>
      </div>
    </div>
  );
};

export default StoreCard;
