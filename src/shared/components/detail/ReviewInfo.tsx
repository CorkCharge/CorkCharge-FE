import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import { StarRate } from '../common/StarRate';
import useMyReviewStore from '@/shared/store/useMyReviewStore';
import useRestaurantStore from '@/shared/store/useRestaurantStore';
import type { StoreReviewResponse } from '@/shared/apis/review/review.type';
import { useToggleReviewLike } from '@/shared/queries/review/useToggleReview';
import { useGetRestaurantReview } from '@/shared/queries/review/useRestaurantReview';

import share from '@/shared/assets/detailPageImgs/share.svg';
import arrow from '@/shared/assets/images/arrow-up-right.svg';
import check from './assets/check.svg';

interface ReviewInfoProps {
  reviews: StoreReviewResponse[];
  storeName: string;
  restId: number;
}

const ReviewInfo = ({ storeName, restId }: ReviewInfoProps) => {
  const navigate = useNavigate();
  const isRated = useRef(false); // 사용자가 별점을 주었는지 확인

  // const selectedReviews = useMyReviewStore((state) => state.selectedReviews);
  const setReviewInfo = useMyReviewStore((state) => state.setReviewInfo);
  const restinfo = useRestaurantStore((state) => state.restInfo);

  const [isBookmarkPending, setIsBookmarkPending] = useState(false);
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기

  const { data: reviews } = useGetRestaurantReview(restId);
  const { mutate: toggleBookmark } = useToggleReviewLike();

  const renderReviews = () => {
    if (reviews?.length === 0) {
      return (
        <p className="py-10 text-center text-lg font-medium text-[var(--gray-8)]">
          저장된 리뷰가 없습니다.
        </p>
      );
    }

    return reviews?.map((review) => (
      <div
        className="relative rounded-2xl bg-[var(--gray-1)] p-4"
        key={review.reviewId}
        id={review.reviewId.toString()}
      >
        {/* 매장명 + 별점 */}
        <span className="text-xl font-bold text-[var(--gray-8)]">{storeName}</span>
        <div className="my-2 flex gap-1">
          <StarRate rate={review.rating} />
          <span className="font-medium">{review.rating}</span>
        </div>

        {/* 리뷰 이미지 */}
        <div className="flex gap-2 overflow-y-auto">{renderReviewImages(review.imageUrls)}</div>

        {/* 리뷰 */}
        <p className="mb-2 font-medium">{review.content}</p>
        <div className="flex gap-2 text-[10px] font-medium">
          <span>{review.writer}</span>
          <span>{review.createdAt.split('T')[0].replaceAll('-', '.')}</span>
        </div>

        {/* 좋아요 + 공유 */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1">
          <div
            className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-white"
            // onClick={() => handleBookmark(review.reviewId, review.scrap)}
            onClick={() => handleBookmark(review.reviewId, review.scrap)}
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
                // fill={selectedReviews.includes(review.reviewId) ? 'var(--primary)' : 'none'}
                // stroke={selectedReviews.includes(review.reviewId) ? 'none' : 'var(--gray-3)'}
                fill={review.scrap ? 'var(--primary)' : 'none'}
                stroke={review.scrap ? 'none' : 'var(--gray-3)'}
              />
              <path
                d="M10.7239 23.6525C10.4143 23.6525 10.1728 23.5764 9.99935 23.4242C9.82596 23.272 9.73926 23.058 9.73926 22.7821V10.3959C9.73926 9.71567 9.9591 9.20434 10.3988 8.86186C10.8385 8.51939 11.4949 8.34814 12.3681 8.34814H19.6322C20.5054 8.34814 21.1618 8.51939 21.6015 8.86186C22.0412 9.20434 22.261 9.71567 22.261 10.3959V22.7821C22.261 23.058 22.1744 23.272 22.0009 23.4242C21.8276 23.5764 21.586 23.6525 21.2763 23.6525C21.0473 23.6525 20.8336 23.5931 20.6355 23.4742C20.4435 23.3553 20.1369 23.1412 19.7158 22.832L16.0837 20.0851C16.028 20.0375 15.9723 20.0375 15.9165 20.0851L12.2845 22.832C11.8634 23.1459 11.5537 23.36 11.3556 23.4742C11.1574 23.5931 10.9468 23.6525 10.7239 23.6525Z"
                fill="white"
                // stroke={selectedReviews.includes(review.reviewId) ? 'none' : 'var(--gray-7)'}
                stroke={review.scrap ? 'none' : 'var(--gray-7)'}
                strokeWidth={1.5}
              />
            </svg>
          </div>
          <span className="text-[10px] font-medium text-[var(--gray-8)]">
            {/* {(reviewCount[review.reviewId] ?? 0) > 99 ? '99+' : (reviewCount[review.reviewId] ?? 0)} */}
            {(review.bookmarkCount ?? 0) > 99 ? '99+' : (review.bookmarkCount ?? 0)}
          </span>
          <div
            className="relative flex size-6 cursor-pointer rounded-full bg-white"
            onClick={() => handleShare(review.reviewId)}
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

  const renderReviewImages = (imageUrls: string[]) =>
    imageUrls.map((url, idx) => (
      <img className="aspect-square w-[40%] shrink-0 rounded-lg" src={url} key={idx} />
    ));

  const goToReview = () => {
    if (!isRated.current) return;
    navigate('/review');
  };

  const handleShare = async (id: number) => {
    const isMobile = /Android|iphone|ipad|ipod/i.test(navigator.userAgent);

    try {
      if (navigator.share && isMobile) {
        await navigator.share({
          title: storeName,
          text: `${storeName} 리뷰를 확인해보세요!`,
          url: `${window.location.href}#${id}`,
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.href}#${id}`);
        setIsCopiedModalOpen(true);
        setTimeout(() => setIsCopiedModalOpen(false), 1000);
      }
    } catch (e) {
      console.error('공유 중 에러 발생 : ' + e);
    }
  };

  const handleBookmark = async (id: number, isLiked: boolean) => {
    if (isBookmarkPending) return;

    setIsBookmarkPending(true);

    toggleBookmark(
      { id, isLiked },
      {
        onError: (e) => {
          console.error(e);
        },
        onSettled: () => {
          setIsBookmarkPending(false);
        },
      }
    );
    // try {
    //   if (selectedReviews.includes(id)) {
    //     await deleteTip(id, 'REVIEW');
    //   } else {
    //     await save(id, 'REVIEW');
    //   }
    //   toggleReview(id);
    // } catch (e) {
    //   console.error('리뷰 토글 실패: ' + e);
    // } finally {
    //   setIsBookmarkPending(false);
    // }
  };

  return (
    <div className="px-4">
      <div className="mb-3 flex h-11 items-center justify-center gap-5 rounded-br-full rounded-tl-full bg-[var(--gray-1)]">
        <StarRate
          rate={0}
          isEditable={true}
          starRating={(rating) => {
            isRated.current = true;
            setReviewInfo(restinfo.restaurantId, rating);
          }}
        />
        <div className="flex cursor-pointer gap-1" onClick={goToReview}>
          <span className="underline">리뷰쓰기</span>
          <img src={arrow} />
        </div>
      </div>

      <div className="flex flex-col gap-3">{renderReviews()}</div>

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

export default ReviewInfo;
