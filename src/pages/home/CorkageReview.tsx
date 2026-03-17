import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Header from '@/shared/components/common/Header';
import { SearchInput } from '@/shared/components/common/Input';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import useRegionFilterStore from '@/shared/store/useRegionFilterStore';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useReviewList } from '@/shared/queries/review/useReviewList';

import arrow from '@/shared/assets/selectArrow.svg';
import logo from '@/shared/assets/images/logo.svg';
import check from '@/shared/components/detail/assets/check.svg';
import filterImg from '@/pages/corkagemap/filterImg.svg';
import ReviewDetail from '@/shared/components/home/ReviewDetail';

function CorkageReview() {
  const navigate = useNavigate();
  const [isDrop, setIsDrop] = useState(false);
  const [isRecent, setIsRecent] = useState(true); //최신순 여부
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // 공유하기 modal 열기
  const [modalStoreName, setModalStoreName] = useState(''); //공유하기 모달 내 store 이름
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기
  const [modalStoreId, setModalStoreId] = useState<number>(); //공유하기 모달 내 store id
  const [searchQuery, setSearchQuery] = useState('');
  const selectedDongNames = useRegionFilterStore((state) => state.selectedDongNames);
  const removeDongFromArray = useRegionFilterStore((state) => state.removeDongFromArray);
  const whichPage = useRegionFilterStore((state) => state.whichPage);
  const resetAddress = useRegionFilterStore((state) => state.resetAddress);
  const filteredRegions = useRegionFilterStore((state) => state.filteredRegions);

  useEffect(() => {
    if (whichPage !== 1) resetAddress();
  }, [whichPage, resetAddress]);

  // 검색어 디바운스
  const debounceQuery = useDebounce(searchQuery, 500);

  // 검색어 캐싱
  const sido = Object.keys(filteredRegions)[0];
  const sigungu = sido ? Object.keys(filteredRegions[sido] ?? {})[0] : undefined;
  const dong = sigungu ? filteredRegions[sido][sigungu] : undefined;
  const { data: reviews } = useReviewList({
    keyword: debounceQuery,
    sido,
    sigungu,
    dongList: dong,
    isSortByBookmark: !isRecent,
  });

  const renderReviews = () => {
    return reviews?.map((review) => (
      <ReviewDetail
        review={review}
        setIsShareModalOpen={(isOpen) => setIsShareModalOpen(isOpen)}
        setModalStoreId={(id) => setModalStoreId(id)}
        setModalStoreName={(name) => setModalStoreName(name)}
      />
    ));
  };

  // 공유 클릭 시 주소 복사
  const clipLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/detail-info/${modalStoreId}`);
    setIsShareModalOpen(false);
    setIsCopiedModalOpen(true);
    setTimeout(() => setIsCopiedModalOpen(false), 1000);
  };

  const renderDongs = () =>
    selectedDongNames.map((dong: string, idx: number) => (
      <div
        className="flex h-8 items-center gap-1 rounded-lg bg-[#90214626] px-2 py-1 text-[12px] font-semibold text-[var(--primary)]"
        key={idx}
      >
        <span>{dong}</span>
        <button onClick={() => removeDongFromArray(dong)}>✕</button>
      </div>
    ));

  return (
    <div className="px-4">
      <section
        className="fixed top-0 z-[10] w-full bg-white pb-4"
        style={{ maxWidth: 'calc(var(--app-width) - 32px)', width: 'calc(100% - 32px)' }}
      >
        <Header title="콜키지 리뷰" type="back" backFn={() => navigate('/home')} />
        <div className="flex h-10">
          <SearchInput
            className="h-full flex-1 text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div
            className="relative z-[2] flex h-full cursor-pointer items-center rounded-full bg-[var(--gray-1)] px-3 py-2 text-sm font-medium text-[var(--gray-6)]"
            onClick={() => setIsDrop((prev) => !prev)}
          >
            <span className="w-[52px] text-center">{isRecent ? '최신순' : '저장수순'}</span>
            <img src={arrow} className="ml-2" />
            <AnimatePresence>
              {isDrop && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 top-[130%] rounded-2xl bg-white px-3 py-2 shadow-lg ${isDrop ? '' : 'hidden'}`}
                >
                  <ul className="whitespace-nowrap text-center text-sm font-medium">
                    <li
                      className={`cursor-pointer border-b px-2 py-1 ${isRecent ? 'text-[var(--primary)]' : 'text-[var(--gray-5)]'}`}
                      onClick={() => {
                        setIsRecent(true);
                        setIsDrop(false);
                      }}
                    >
                      최신순
                    </li>
                    <li
                      className={`cursor-pointer px-2 py-1 ${!isRecent ? 'text-[var(--primary)]' : 'text-[var(--gray-5)]'}`}
                      onClick={() => {
                        setIsRecent(false);
                        setIsDrop(false);
                      }}
                    >
                      저장수순
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 리뷰 영역 */}
      <div
        className={`pt-[104px] ${selectedDongNames.length > 0 ? 'mb-[160px]' : 'mb-[80px]'} flex flex-col gap-4`}
      >
        {renderReviews()}
      </div>

      {/* 지역 설정 버튼 or 필터 영역 */}
      {selectedDongNames.length < 1 ? (
        <Button
          value="지역 설정"
          className="fixed left-1/2 mx-auto w-4/5 -translate-x-1/2 bg-[var(--primary)] text-white"
          style={{
            maxWidth: 'calc(var(--app-width) * 0.8)',
            bottom: 'calc(var(--footer-h) + 15px)',
          }}
          onClick={() => navigate('/region-filter', { state: { from: 1 } })}
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
  );
}

export default CorkageReview;
