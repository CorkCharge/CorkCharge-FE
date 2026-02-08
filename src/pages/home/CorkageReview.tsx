import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Header from '@/shared/components/common/Header';
import { SearchInput } from '@/shared/components/common/Input';
import { StarRate } from '@/shared/components/common/StarRate';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import useRegionFilterStore from '@/shared/store/useRegionFilterStore';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useReviewList } from '@/shared/queries/useReviewList';
import useBookmarkStore from '@/shared/store/useBookmarkStore';
import { createBookmark, deleteBookmark } from '@/shared/apis/bookmark/bookmark.api';

import arrow from '@/shared/assets/selectArrow.svg';
import share from '@/shared/assets/detailPageImgs/share.svg';
import logo from '@/shared/assets/images/logo.svg';
import check from '@/shared/components/detail/assets/check.svg';
import filterImg from '@/pages/corkagemap/filterImg.svg';

function CorkageReview() {
  const navigate = useNavigate();
  const [isDrop, setIsDrop] = useState(false);
  const [isRecent, setIsRecent] = useState(true); //최신순 여부
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // 공유하기 modal 열기
  const [modalStoreName, setModalStoreName] = useState(''); //공유하기 모달 내 store 이름
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기
  const [modalStoreId, setModalStoreId] = useState<number>(); //공유하기 모달 내 store id
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, setIsPending] = useState(false);

  const selectedReviews = useBookmarkStore((state) => state.selectedReviews);
  const toggleReview = useBookmarkStore((state) => state.toggleReview);
  const reviewCount = useBookmarkStore((state) => state.reviewCount);
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
    isSortByBookmark: isRecent,
  });

  const renderReviews = () =>
    reviews?.map((review) => (
      <div
        className="relative cursor-pointer rounded-2xl bg-[var(--gray-1)] p-4"
        key={review.reviewId}
        onClick={() => navigate(`/detail-info/${review.restaurantId}`)}
      >
        {/* 매장명 + 별점 */}
        <span className="text-xl font-bold text-[var(--gray-8)]">{review.restaurantName}</span>
        <div className="my-2 flex gap-1">
          <StarRate rate={review.rating} />
          <span className="font-medium">4</span>
        </div>

        {/* 리뷰 이미지 */}
        <div className="mb-1 flex gap-2 overflow-y-auto">
          {renderReviewImages(review.imageUrls)}
        </div>

        {/* 리뷰 작성 정보 */}
        <p className="mb-2 font-medium">{review.content}</p>
        <div className="flex gap-2 text-[10px] font-medium">
          <span>{review.writer}</span>
          <span>{review.createdAt.split('T')[0].replaceAll('-', '.')}</span>
        </div>

        {/* 좋아요 + 공유 */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1">
          <div
            className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-white"
            onClick={(e) => handleKeep(e, review.reviewId)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <circle
                cx="16"
                cy="16"
                r="15"
                fill={selectedReviews.includes(review.reviewId) ? 'var(--primary)' : 'none'}
                stroke={selectedReviews.includes(review.reviewId) ? 'none' : 'var(--gray-3)'}
              />
              <path
                d="M10.7239 23.6525C10.4143 23.6525 10.1728 23.5764 9.99935 23.4242C9.82596 23.272 9.73926 23.058 9.73926 22.7821V10.3959C9.73926 9.71567 9.9591 9.20434 10.3988 8.86186C10.8385 8.51939 11.4949 8.34814 12.3681 8.34814H19.6322C20.5054 8.34814 21.1618 8.51939 21.6015 8.86186C22.0412 9.20434 22.261 9.71567 22.261 10.3959V22.7821C22.261 23.058 22.1744 23.272 22.0009 23.4242C21.8276 23.5764 21.586 23.6525 21.2763 23.6525C21.0473 23.6525 20.8336 23.5931 20.6355 23.4742C20.4435 23.3553 20.1369 23.1412 19.7158 22.832L16.0837 20.0851C16.028 20.0375 15.9723 20.0375 15.9165 20.0851L12.2845 22.832C11.8634 23.1459 11.5537 23.36 11.3556 23.4742C11.1574 23.5931 10.9468 23.6525 10.7239 23.6525Z"
                fill="white"
                stroke={selectedReviews.includes(review.reviewId) ? 'none' : 'var(--gray-7)'}
                strokeWidth={1.5}
              />
            </svg>
          </div>
          <span className="text-[10px] font-medium text-[var(--gray-8)]">
            {(reviewCount[review.reviewId] ?? 0) > 99 ? '99+' : (reviewCount[review.reviewId] ?? 0)}
          </span>
          <div
            className="relative flex size-6 cursor-pointer rounded-full bg-white"
            onClick={(e) => handleShare(e, review.restaurantName, review.reviewId)}
          >
            <img
              src={share}
              className="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-[40%]"
            />
          </div>
        </div>
      </div>
    ));

  const handleKeep = async (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();

    if (isPending) return;
    setIsPending(true);

    try {
      if (selectedReviews.includes(id)) {
        await deleteBookmark({ targetId: id, targetType: 'REVIEW' });
      } else {
        await createBookmark({ targetId: id, targetType: 'REVIEW' });
      }

      toggleReview(id);
    } catch (e) {
      console.error('리뷰 저장/삭제 실패: ' + e);
    } finally {
      setIsPending(false);
    }

    // setIsGroupSelectorOpen(true);
  };

  const handleShare = async (
    e: React.MouseEvent<HTMLDivElement>,
    storeName: string,
    storeId: number
  ) => {
    e.stopPropagation();

    const isMobile = /Android|iphone|ipad|ipod/i.test(navigator.userAgent);

    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: storeName,
          text: `${storeName} 리뷰를 확인해보세요!`,
          url: `${window.location.href}#${storeId}`,
        });
      } catch (err) {
        console.log('공유 중 에러 발생 : ' + err);
      }
    } else {
      setModalStoreId(storeId);
      setModalStoreName(storeName);
      setIsShareModalOpen(true);
    }
  };

  const renderReviewImages = (imgUrls: string[]) =>
    imgUrls.map((url, idx) => (
      <img className="aspect-square w-[40%] shrink-0 rounded-lg" key={idx} src={url} />
    ));

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
          <div className="relative z-[2] flex h-full items-center rounded-2xl bg-[var(--gray-1)] px-3 py-2 text-sm font-medium text-[var(--gray-6)]">
            <span className="w-[52px] text-center">{isRecent ? '최신순' : '저장수순'}</span>
            <img
              src={arrow}
              className="ml-2 cursor-pointer"
              onClick={() => setIsDrop((prev) => !prev)}
            />
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
