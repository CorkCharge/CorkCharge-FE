import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Share from '@/shared/icons/Share';
import Modal from '../common/Modal';
import { GROUP_ICONS } from '@/shared/constants/groupMarker';

import Star from '../../assets/star.svg';
import logo from '@/shared/assets/images/logo.svg';
import Button from '../common/Button';
import check from '@/shared/components/detail/assets/check.svg';
import GroupSelector from '../home/GroupSelector';
import GroupList from '../home/GroupList';

interface StoreProps {
  restaurantId: number;
  name: string;
  rating: number;
  reviewCount: number;
  openingHoursText: string;
  imageUrls: string[];
  corkagePrice: string;
  corkageOption: string;
}

const StoreCard = ({
  restaurant,
  groupMarker,
}: {
  restaurant: StoreProps;
  groupMarker: string;
}) => {
  const navigate = useNavigate();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // 복사하기 모달
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false);
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false);

  // 복사하기 로직
  const clipLink = async () => {
    const isMobile = /Android|iphone|ipad|ipod/i.test(navigator.userAgent);

    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: restaurant.name,
          text: `${restaurant.name} 정보를 확인해보세요!`,
          url: `${window.location.origin}/detail-info/${restaurant.restaurantId}`,
        });
      } catch (err) {
        console.error('공유 중 에러 발생 : ' + err);
      }
    } else {
      try {
        navigator.clipboard.writeText(
          `${window.location.origin}/detail-info/${restaurant.restaurantId}`
        );
        setIsShareModalOpen(false);
        setIsCopiedModalOpen(true);
        setTimeout(() => setIsCopiedModalOpen(false), 1000);
      } catch (e) {
        console.error('클립보드 복사 실패: ' + e);
      }
    }
  };

  return (
    <div
      className="flex w-full flex-col bg-white"
      onClick={() => navigate(`/detail-info/${restaurant.restaurantId}`)}
    >
      <div className="relative flex w-full items-start justify-between pl-4">
        {/* 식당 이름 */}
        <h2 className="text-xl font-bold leading-none text-[var(--gray-8)]">{restaurant.name}</h2>
        {/* 우측 아이콘 버튼들 */}
        <div className="flex gap-1">
          <img
            src={GROUP_ICONS[groupMarker]}
            className="size-6 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsGroupSelectorOpen(true);
            }}
          />
          <Share
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsShareModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* 평점 및 영업 정보 */}
      <div className="mt-1 flex items-center pl-4">
        <img src={Star} alt="star" className="h-[15px] w-[16px]" />

        {/* 평점 */}
        <span className="ml-[4px] font-[500] text-[var(--text-8)]">
          {restaurant.rating?.toFixed(1) ?? 0}
        </span>

        {/* 리뷰 수 */}
        <span className="ml-1 text-sm font-[500] text-[var(--gray-5)]">
          ({restaurant.reviewCount})
        </span>

        <div className="ml-2 flex items-center gap-1">
          {/* 영업 상태 */}
          <span className="text-[14px] font-[600] text-[var(--gray-8)]">영업중</span>
          {/* 영업 시간 */}
          <span className="max-w-[120px] truncate text-sm font-[500] text-[var(--gray-5)]">
            {restaurant.openingHoursText}
          </span>
        </div>
      </div>

      {/* 음식 이미지 리스트 */}
      <div className="mt-2 flex w-full gap-1 overflow-hidden pl-4">
        {restaurant.imageUrls &&
          restaurant.imageUrls.length > 0 &&
          restaurant.imageUrls
            .slice(0, 4)
            .map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`food-${index}`}
                className="h-[80px] w-[80px] rounded-[4px] object-cover"
              />
            ))}
      </div>

      {/* 하단 정보 박스 (비용/기타) */}
      <div className="mt-2 flex w-full flex-col justify-center rounded-2xl bg-[var(--gray-1)] px-4 py-2">
        {/* 비용 */}
        <div className="flex w-full items-center">
          <span className="min-w-fit font-[700]">비용</span>
          <span className="ml-9 truncate font-[500]">{restaurant.corkagePrice}</span>
        </div>

        {/* 구분선 */}
        <div className="my-2 h-[1px] w-full bg-[var(--gray-3)]" />

        {/* 기타 */}
        <div className="flex w-full items-center">
          <span className="min-w-fit font-[700]">기타</span>
          <span className="ml-9 text-nowrap font-[500]">{restaurant.corkageOption ?? '없음'}</span>
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
              <span className="font-semibold">{restaurant.name}</span>
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

      {/* 그룹 셀렉터 */}
      <GroupSelector
        isOpen={isGroupSelectorOpen}
        topSnapVh={17.8}
        onClose={() => setIsGroupSelectorOpen(false)}
      >
        {isGroupSelectorOpen && (
          <GroupList
            onClose={() => setIsGroupSelectorOpen(false)}
            restaurantName={restaurant.name}
            restaurantId={restaurant.restaurantId}
          />
        )}
      </GroupSelector>
    </div>
  );
};

export default StoreCard;
