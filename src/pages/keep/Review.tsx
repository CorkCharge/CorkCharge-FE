import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { StarWithStroke } from '@/shared/components/common/StarRate';
import useBookmarkStore from '@/shared/store/useBookmarkStore';
import { createBookmark, deleteBookmark } from '@/shared/apis/bookmark/bookmark.api';
import { useGetMyKeepReviews } from '@/shared/queries/bookmark/useGetMyKeepReviews';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';

import share from '@/shared/assets/detailPageImgs/share.svg';
import logo from '@/shared/assets/images/logo.svg';
import check from '@/shared/components/detail/assets/check.svg';

const Review = () => {
  // const navigate = useNavigate();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // 공유하기 modal 열기
  const [modalStoreName, setModalStoreName] = useState(''); //공유하기 모달 내 store 이름
  const [modalStoreId, setModalStoreId] = useState<number>(); //공유하기 모달 내 store id
  const [isPending, setIsPending] = useState(false);
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기

  const selectedReviews = useBookmarkStore((state) => state.selectedReviews);
  const reviewCount = useBookmarkStore((state) => state.reviewCount);
  const toggleReview = useBookmarkStore((state) => state.toggleReview);

  const { data: reviews } = useGetMyKeepReviews();

  const renderReviews = () => {
    if (!reviews) return;

    if (reviews?.length < 1) {
      return <p className="flex h-[30vh] items-center justify-center">저장된 리뷰가 없습니다.</p>;
    }

    return reviews?.map((review) => (
      <div
        className="relative w-full cursor-pointer rounded-2xl bg-[var(--gray-1)] p-4"
        key={review.reviewId}
        // onClick={() => navigate(`/detail-info/${review.restaurantId}`)}
      >
        {/* 매장명 + 별점 */}
        <span className="text-xl font-bold text-[var(--gray-8)]">{review.restaurantName}</span>
        <div className="my-2 flex gap-1">
          <StarWithStroke rate={review.rating} />
          <span className="font-medium">{review.rating}</span>
        </div>

        {/* 리뷰 이미지 */}
        <div className="mb-1 flex gap-2 overflow-y-auto">
          {/* {renderReviewImages(review.imageUrls)} */}
        </div>

        {/* 리뷰 작성 정보 */}
        <p className="mb-2 font-medium">{review.content}</p>
        <div className="flex gap-2 text-[10px] font-medium">
          <span>{review.userName}</span>
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

  // 공유 클릭 시 주소 복사
  const clipLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/detail-info/${modalStoreId}`);
    setIsShareModalOpen(false);
    setIsCopiedModalOpen(true);
    setTimeout(() => setIsCopiedModalOpen(false), 1000);
  };

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
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {renderReviews()}

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
};

export default Review;
