import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '@/shared/components/common/Header';
import Button from '@/shared/components/common/Button';
import useRegionFilterStore from '@/shared/store/useRegionFilterStore';
import Modal from '@/shared/components/common/Modal';
import type { RestaurantScrapResponse } from '@/shared/apis/restaurant/restaurant.type';
import { fetchNearStores } from '@/shared/apis/restaurant/restaurant.api';
import GroupSelector from '@/shared/components/home/GroupSelector';
import GroupList from '@/shared/components/home/GroupList';

import star from '@/shared/assets/star.svg';
import share from '@/shared/assets/detailPageImgs/share.svg';
import keep from '@/pages/corkagemap/list/savemarker/SaveMarker3.svg';
import logo from '@/shared/assets/images/logo.svg';
import check from '@/shared/components/detail/assets/check.svg';

function NearbyStores() {
  const navigate = useNavigate();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // 공유하기 modal 열기
  const [modalStoreName, setModalStoreName] = useState(''); //공유하기 모달 내 store 이름
  const [modalStoreId, setModalStoreId] = useState<number>(); //공유하기 모달 내 store id
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false); // 그룹 선택 바텀 시트 열기
  const [stores, setStores] = useState<RestaurantScrapResponse[]>([]);
  const [selectedStore, setSelectedStore] = useState<RestaurantScrapResponse>();

  const selectedDongNames = useRegionFilterStore((state) => state.selectedDongNames);

  useEffect(() => {
    getNearbyStores();
  }, []);

  const getNearbyStores = async () => {
    try {
      const res = await fetchNearStores();
      setStores(res);
    } catch (e) {
      console.error('가까운 매장 가져오기 실패: ' + e);
    }
  };

  const handleShare = (e: React.MouseEvent<HTMLDivElement>, name: string, id: number) => {
    e.stopPropagation();
    setModalStoreName(name);
    setModalStoreId(id);
    setIsShareModalOpen(true);
  };

  const handleKeep = (e: React.MouseEvent<HTMLDivElement>, store: RestaurantScrapResponse) => {
    e.stopPropagation();
    setSelectedStore(store);
    setIsGroupSelectorOpen(true);
  };

  // 공유 클릭 시 주소 복사
  const clipLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/detail-info/${modalStoreId}`);
    setIsShareModalOpen(false);
    setIsCopiedModalOpen(true);
    setTimeout(() => setIsCopiedModalOpen(false), 1000);
  };

  const renderNearStores = () =>
    stores?.map((store) => (
      <div
        key={store.restaurantId}
        className="flex cursor-pointer flex-col gap-2"
        onClick={() => navigate(`/detail-info/${store.restaurantId}`)}
      >
        <div>
          {store.mainImageUrls ? (
            <img src={store.mainImageUrls} className="h-[172px] w-full rounded-t-2xl" />
          ) : (
            <div className="h-[172px] rounded-t-2xl bg-black" />
          )}
          <div className="flex h-11 items-center justify-center rounded-b-2xl bg-[var(--glass)] text-sm font-bold text-[var(--gray-8)]">
            {store.corkagePrice}
          </div>
        </div>
        <div className="relative">
          <span className="text-lg font-bold">{store.restaurantName}</span>
          <p className="flex gap-1 font-medium">
            <span>{store.distance}km</span>
            <span>{store.address}</span>
          </p>
          <span className="font-medium">{store.openingHours}</span>
          <div className="mt-1 flex font-medium text-[var(--gray-8)]">
            <img src={star} className="mr-1" />
            <span className="mr-2">{store.rating?.toFixed(1) ?? 0}</span>
            <span>리뷰 total {store.reviewCount}</span>
          </div>
          <div className="absolute bottom-0 right-0 flex items-center gap-1">
            <div
              className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-white"
              onClick={(e) => handleKeep(e, store)}
            >
              <img src={keep} className="size-6" />
            </div>
            <span className="text-sm font-medium text-[var(--gray-8)]">
              {store.bookmarkCount > 99 ? '99+' : store.bookmarkCount}
            </span>
            <div
              className="relative flex size-6 cursor-pointer rounded-full bg-white"
              onClick={(e) => handleShare(e, store.restaurantName, store.restaurantId)}
            >
              <img
                src={share}
                className="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-[40%]"
              />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <div className="relative px-4">
        <Header
          title="가까운 매장"
          type="back"
          backFn={() => navigate('/home')}
          className="fixed top-0 bg-white"
          style={{ maxWidth: 'calc(var(--app-width) - 32px)', width: 'calc(100% - 32px)' }}
        />
        <div
          className={`mt-12 flex flex-col gap-6 ${selectedDongNames.length > 0 ? 'mb-[200px]' : 'mb-[120px]'}`}
        >
          {renderNearStores()}
        </div>

        {/* 공유하기 모달 */}
        <Modal
          isOpen={isShareModalOpen}
          hasCloseButton={true}
          onClose={() => setIsShareModalOpen(false)}
        >
          <div className="mb-4 flex items-center">
            <img src={logo} className="h-[22px] w-[13px]" />
            <div className="ml-3 flex flex-col">
              <span className="font-semibold">{modalStoreName}</span>
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
      </div>

      {/* 그룹 선택기 */}
      <GroupSelector
        isOpen={isGroupSelectorOpen}
        topSnapVh={17.8}
        onClose={() => setIsGroupSelectorOpen(false)}
      >
        <GroupList
          onClose={() => setIsGroupSelectorOpen(false)}
          restaurantName={selectedStore?.restaurantName ?? ''}
          restaurantId={selectedStore?.restaurantId ?? 1}
        />
      </GroupSelector>
    </>
  );
}

export default NearbyStores;
