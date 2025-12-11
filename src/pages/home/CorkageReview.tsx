import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Header from '@/shared/components/common/Header';
import { SearchInput } from '@/shared/components/common/Input';
import { StarRate } from '@/shared/components/common/StarRate';
import useMyReviewStore from '@/shared/store/useMyReviewStore';
import Modal from '@/shared/components/common/Modal';
import GroupSelector from '@/shared/components/home/GroupSelector';
import GroupList from '@/shared/components/home/GroupList';
import Button from '@/shared/components/common/Button';
import useRegionFilterStore from '@/shared/store/useRegionFilterStore';

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
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false); // 그룹 선택 바텀 시트 열기

  const selectedReviews = useMyReviewStore((state) => state.selectedReviews);
  const toggleReview = useMyReviewStore((state) => state.toggleReview);
  const selectedDongNames = useRegionFilterStore((state) => state.selectedDongNames);
  const removeDongFromArray = useRegionFilterStore((state) => state.removeDongFromArray);

  const renderReviews = () =>
    [...new Array(3)].map((_, idx) => (
      <div className="relative rounded-2xl bg-[var(--gray-1)] p-4" key={idx}>
        {/* 매장명 + 별점 */}
        <span className="text-xl font-bold text-[var(--gray-8)]">매장명</span>
        <div className="my-2 flex gap-1">
          <StarRate rate={4} />
          <span className="font-medium">4</span>
        </div>

        {/* 리뷰 이미지 */}
        <div className="mb-1 flex gap-2 overflow-y-auto">{renderReviewImages()}</div>

        {/* 리뷰 */}
        <p className="mb-2 font-medium">
          너무 친절하셔서 무조건 다시와야 하는 곳입니다!!! 무조건 재방문너무너무 친절하셔서 무조건
          다시와야 하는 곳입니다!!! 무조건 재방문너무
        </p>
        <div className="flex gap-2 text-[10px] font-medium">
          <span>작성자</span>
          <span>2025.12.09</span>
        </div>

        {/* 좋아요 + 공유 */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1">
          <div
            className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-white"
            onClick={() => {
              toggleReview(idx);
              setIsGroupSelectorOpen(true);
            }}
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
                fill={selectedReviews.has(idx) ? 'var(--primary)' : 'none'}
                stroke={selectedReviews.has(idx) ? 'none' : 'var(--gray-3)'}
              />
              <path
                d="M10.7239 23.6525C10.4143 23.6525 10.1728 23.5764 9.99935 23.4242C9.82596 23.272 9.73926 23.058 9.73926 22.7821V10.3959C9.73926 9.71567 9.9591 9.20434 10.3988 8.86186C10.8385 8.51939 11.4949 8.34814 12.3681 8.34814H19.6322C20.5054 8.34814 21.1618 8.51939 21.6015 8.86186C22.0412 9.20434 22.261 9.71567 22.261 10.3959V22.7821C22.261 23.058 22.1744 23.272 22.0009 23.4242C21.8276 23.5764 21.586 23.6525 21.2763 23.6525C21.0473 23.6525 20.8336 23.5931 20.6355 23.4742C20.4435 23.3553 20.1369 23.1412 19.7158 22.832L16.0837 20.0851C16.028 20.0375 15.9723 20.0375 15.9165 20.0851L12.2845 22.832C11.8634 23.1459 11.5537 23.36 11.3556 23.4742C11.1574 23.5931 10.9468 23.6525 10.7239 23.6525Z"
                fill="white"
                stroke={selectedReviews.has(idx) ? 'none' : 'var(--gray-7)'}
                strokeWidth={1.5}
              />
            </svg>
          </div>
          <span className="text-[10px] font-medium text-[var(--gray-8)]">99+</span>
          <div
            className="relative flex size-6 cursor-pointer rounded-full bg-white"
            onClick={handleShare}
          >
            <img
              src={share}
              className="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-[40%]"
            />
          </div>
        </div>
      </div>
    ));

  const handleShare = async () => {
    const isMobile = /Android|iphone|ipad|ipod/i.test(navigator.userAgent);

    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: '공유공유공유',
          text: '정빈몬! 공유해줘!!!!!',
          url: window.location.origin + `/detail-info/${modalStoreId}`,
        });
      } catch (err) {
        console.log('공유 중 에러 발생 : ' + err);
      }
    } else {
      setModalStoreId(88);
      setModalStoreName('램니쿠야');
      setIsShareModalOpen(true);
    }
  };

  const renderReviewImages = () =>
    [...new Array(5)].map((_, idx) => (
      <div className="aspect-square w-[40%] shrink-0 rounded-lg bg-black" key={idx} />
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
        className="flex h-[32px] items-center gap-1 rounded-lg bg-[#90214626] px-2 py-1 text-[12px] font-semibold text-[#90212A]"
        key={idx}
      >
        <span>{dong}</span>
        <button onClick={() => removeDongFromArray(dong)}>✕</button>
      </div>
    ));

  return (
    <div className="px-4">
      <Header title="콜키지 리뷰" type="back" backFn={() => navigate('/home')} />
      <div className="flex h-10">
        <SearchInput className="h-full flex-1 text-sm font-medium" />
        <div className="relative flex h-full items-center rounded-2xl bg-[var(--gray-1)] px-3 py-2 text-sm font-medium text-[var(--gray-6)]">
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

      {/* 리뷰 영역 */}
      <div
        className={`${selectedDongNames.length > 0 ? 'mb-[160px]' : 'mb-[80px]'} mt-4 flex flex-col gap-4`}
      >
        {renderReviews()}
      </div>

      {/* 지역 설정 버튼 or 필터 영역 */}
      {selectedDongNames.length < 1 ? (
        <Button
          value="지역 검색"
          className="fixed left-1/2 mx-auto -translate-x-1/2 bg-[var(--primary)] text-white"
          style={{
            maxWidth: 'calc(var(--app-width) * 0.8)',
            bottom: 'calc(var(--footer-h) + 15px)',
          }}
          onClick={() => navigate('/region-filter')}
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
      <GroupSelector
        isOpen={isGroupSelectorOpen}
        topSnapVh={17.8}
        onClose={() => setIsGroupSelectorOpen(false)}
      >
        <GroupList onClose={() => setIsGroupSelectorOpen(false)} />
      </GroupSelector>
    </div>
  );
}

export default CorkageReview;
