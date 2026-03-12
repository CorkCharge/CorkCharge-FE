import { useState } from 'react';

import type { MasterStoreResponse } from '@/shared/apis/user/user.type';
import Share from '@/shared/icons/Share';
import Bookmark from '@/shared/icons/Bookmark';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { getTodayOperatingHours } from '@/shared/utils/operatingHours';
import GroupSelector from '../home/GroupSelector';
import GroupList from '../home/GroupList';

import star from '@/shared/assets/star.svg';
import logo from '@/shared/assets/images/logo.svg';
import check from '@/shared/components/detail/assets/check.svg';

const MyStoreItem = ({ store }: { store: MasterStoreResponse }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false);
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false);

  const clipLink = async () => {
    const isMobile = /Android|iphone|ipad|ipod/i.test(navigator.userAgent);

    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: store.restaurantName,
          text: `${store.restaurantName} 정보를 확인해보세요!`,
          url: `${window.location.origin}/detail-info/${store.restaurantId}`,
        });
      } catch (err) {
        console.log('공유 중 에러 발생 : ' + err);
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/detail-info/${store.restaurantId}`);
      setShareModalOpen(false);
      setIsCopiedModalOpen(true);
      setTimeout(() => setIsCopiedModalOpen(false), 1000);
    }
  };

  const renderImages = (urls: string[]) =>
    urls.map((url, idx) => (
      <img key={idx} src={url} className="aspect-square size-[25%] rounded-lg" />
    ));

  return (
    <div className="relative flex flex-col gap-1">
      <h3 className="px-4 text-xl font-bold text-[var(--gray-8)]">{store.restaurantName}</h3>

      <div className="absolute right-4 top-0 flex gap-1">
        <Bookmark onClick={() => setIsGroupSelectorOpen(true)} />
        <Share onClick={() => setShareModalOpen(true)} />
      </div>

      <div className="flex items-center gap-1 px-4">
        <img src={star} />
        <span className="font-medium text-[var(--gray-8)]">{store.rating?.toFixed(1) ?? 0}</span>
        <span className="text-sm font-medium text-[var(--gray-5)]">({store.totalReviewCount})</span>
        <span className="text-sm font-semibold">영업중</span>
        <span className="text-sm font-medium text-[var(--gray-6)]">
          {getTodayOperatingHours(store.openingHours)}
        </span>
      </div>

      {store.mainImages.length > 0 && (
        <div className="flex gap-1 overflow-x-auto px-4">{renderImages(store.mainImages)}</div>
      )}

      <div className="mt-1 rounded-2xl bg-[var(--gray-1)] px-4 py-2">
        <div className="grid grid-cols-[60px_8fr] text-nowrap border-b pb-1">
          <span className="inline-block max-w-[40px] font-bold">비용</span>
          <span className="inline-block">{store.corkagePrice}</span>
        </div>
        <div className="grid grid-cols-[60px_8fr] pt-1">
          <span className="inline-block text-nowrap font-bold">기타</span>
          <span className="inline-block truncate">{store.corkageOptions.join(', ')}</span>
        </div>
      </div>

      {/* 공유하기 모달 */}
      <Modal isOpen={shareModalOpen} hasCloseButton={true} onClose={() => setShareModalOpen(false)}>
        <div className="mb-4 flex items-center">
          <img src={logo} className="h-[22px] w-[13px]" />
          <div className="ml-3 flex flex-col">
            <span className="font-semibold">{store.restaurantName}</span>
            <span className="text-xs text-[rgba(60,60,67,0.6)]">corkcharge.com</span>
          </div>
        </div>
        <Button
          value="링크 복사하기"
          className="bg-[var(--gray-1)] text-[var(--gray-8)] shadow-none"
          onClick={clipLink}
        />
      </Modal>

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
        <GroupList
          onClose={() => setIsGroupSelectorOpen(false)}
          restaurantId={store.restaurantId}
          restaurantName={store.restaurantName}
        />
      </GroupSelector>
    </div>
  );
};

export default MyStoreItem;
