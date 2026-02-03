import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '@/shared/components/common/Header';
import Button from '@/shared/components/common/Button';
import useRegionFilterStore from '@/shared/store/useRegionFilterStore';
import Modal from '@/shared/components/common/Modal';
import GroupSelector from '@/shared/components/home/GroupSelector';
import GroupList from '@/shared/components/home/GroupList';
import { useCategoryStores } from '@/shared/queries/useCategoryStores';

import star from '@/shared/assets/star.svg';
import share from '@/shared/assets/detailPageImgs/share.svg';
import keep from '@/pages/corkagemap/list/savemarker/SaveMarker3.svg';
import filterImg from '@/pages/corkagemap/filterImg.svg';
import logo from '@/shared/assets/images/logo.svg';
import check from '@/shared/components/detail/assets/check.svg';

// 타이틀 별 region-filter에서의 페이지 번호 매칭
const FROM_TITLE_MAPPER: Record<string, number> = {
  중국요리: 3.1,
  회: 3.2,
  이탈리안: 3.3,
  초밥: 3.4,
  '육류,고기': 3.5,
};

function CategoryStores() {
  const navigate = useNavigate();
  const title = useLocation().state?.title ?? '이탈리안';

  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // 공유하기 modal 열기
  const [modalStoreName, setModalStoreName] = useState(''); //공유하기 모달 내 store 이름
  const [modalStoreId, setModalStoreId] = useState<number>(); //공유하기 모달 내 store id
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false); // 그룹 선택 바텀 시트 열기

  const selectedDongNames = useRegionFilterStore((state) => state.selectedDongNames);
  const removeDongFromArray = useRegionFilterStore((state) => state.removeDongFromArray);
  const whichPage = useRegionFilterStore((state) => state.whichPage);
  const filteredRegions = useRegionFilterStore((state) => state.filteredRegions);
  const resetAddress = useRegionFilterStore((state) => state.resetAddress);

  useEffect(() => {
    if (whichPage !== FROM_TITLE_MAPPER[title]) resetAddress();
  }, [resetAddress, title, whichPage]);

  const sido = Object.keys(filteredRegions)[0];
  const sigungu = sido ? Object.keys(filteredRegions[sido])[0] : undefined;
  const dong = sigungu ? filteredRegions[sido][sigungu] : undefined;
  const { data: stores } = useCategoryStores({ category: title, sido, sigungu, dong });

  const handleShare = (e: React.MouseEvent<HTMLDivElement>, name: string, id: number) => {
    e.stopPropagation();
    setModalStoreName(name);
    setModalStoreId(id);
    setIsShareModalOpen(true);
  };

  const handleKeep = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsGroupSelectorOpen(true);
  };

  // 공유 클릭 시 주소 복사
  const clipLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/detail-info/${modalStoreId}`);
    setIsShareModalOpen(false);
    setIsCopiedModalOpen(true);
    setTimeout(() => setIsCopiedModalOpen(false), 1000);
  };

  const renderStores = () =>
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
            <span className="mr-2">{store.rating.toFixed(1)}</span>
            <span>리뷰 total {store.reviewCount}</span>
          </div>
          <div className="absolute bottom-0 right-0 flex items-center gap-1">
            <div
              className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-white"
              onClick={handleKeep}
            >
              <img src={keep} className="size-6" />
            </div>
            <span className="text-sm font-medium text-[var(--gray-8)]">99+</span>
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

  const renderDongs = () =>
    selectedDongNames.map((dong: string, idx: number) => (
      <div
        className="flex h-[32px] items-center gap-1 rounded-lg bg-[#90214626] px-2 py-1 text-[12px] font-semibold text-[#90212A]"
        key={idx}
      >
        <span>{dong}</span>
        <button onClick={() => removeDongFromArray(dong)}>✕</button>
      </div>
    ));

  return (
    <>
      <div className="relative px-4">
        <Header title={title} type="back" backFn={() => navigate('/home')} />
        <div
          className={`flex flex-col gap-6 ${selectedDongNames.length > 0 ? 'mb-[200px]' : 'mb-[120px]'}`}
        >
          {renderStores()}
        </div>
        {selectedDongNames.length < 1 ? (
          <Button
            value="지역 검색"
            className="fixed left-1/2 mx-auto w-4/5 -translate-x-1/2 bg-[var(--primary)] text-white"
            style={{
              maxWidth: 'calc(var(--app-width) * 0.8)',
              bottom: 'calc(var(--footer-h) + 15px)',
            }}
            onClick={() =>
              navigate('/region-filter', { state: { from: FROM_TITLE_MAPPER[title] } })
            }
          />
        ) : (
          <div
            className="fixed left-1/2 h-[150px] w-full -translate-x-1/2 bg-white px-4 py-2"
            style={{ maxWidth: 'var(--app-width)', bottom: 'var(--footer-h)' }}
          >
            <div className="flex items-center gap-2">
              <img src={filterImg} className="size-6" />
              <span className="text-xs font-semibold">
                <span className="text-[var(--primary)]">{selectedDongNames.length}</span>/10
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">{renderDongs()}</div>
          </div>
        )}

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
      <GroupSelector
        isOpen={isGroupSelectorOpen}
        topSnapVh={17.8}
        onClose={() => setIsGroupSelectorOpen(false)}
      >
        <GroupList onClose={() => setIsGroupSelectorOpen(false)} />
      </GroupSelector>
    </>
  );
}

export default CategoryStores;
