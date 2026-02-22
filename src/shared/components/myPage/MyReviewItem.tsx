import { useState } from 'react';

import { StarWithStroke } from '../common/StarRate';
import {
  ShareModal,
  ModifyModal,
  DeleteModal,
  ModifyComplete,
  DeleteCompleteModal,
} from './ReviewModals';
import useMyPageStore from '@/shared/store/useMyPageStore';
import useBookmarkStore from '@/shared/store/useBookmarkStore';
import { createBookmark, deleteBookmark } from '@/shared/apis/bookmark/bookmark.api';

import edit from '@/shared/components/myPage/images/edit.svg';
import share from '@/shared/assets/detailPageImgs/share.svg';
import check from '@/shared/components/detail/assets/check.svg';
import type { MyReviewResponse } from '@/shared/apis/user/user.type';
import { useQueryClient } from '@tanstack/react-query';

const DeleteSvg = () => (
  <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.21301 9.10829C3.12376 9.10829 3.05204 9.08279 2.99785 9.03179C2.94366 8.98079 2.91498 8.91229 2.91179 8.8262L2.76835 3.71504C2.76516 3.63217 2.79066 3.56523 2.84485 3.51423C2.90223 3.46004 2.97554 3.43295 3.06479 3.43295C3.15085 3.43295 3.22098 3.45845 3.27516 3.50945C3.33254 3.56045 3.36123 3.62739 3.36123 3.71026L3.50945 8.8262C3.50945 8.9091 3.48236 8.97761 3.42816 9.03179C3.37398 9.08279 3.30226 9.10829 3.21301 9.10829ZM4.62826 9.10829C4.53899 9.10829 4.46572 9.08279 4.40831 9.03179C4.35095 8.97761 4.32226 8.9091 4.32226 8.8262V3.71504C4.32226 3.63217 4.35095 3.56523 4.40831 3.51423C4.46572 3.46004 4.53899 3.43295 4.62826 3.43295C4.72072 3.43295 4.79563 3.46004 4.85299 3.51423C4.91036 3.56523 4.93904 3.63217 4.93904 3.71504V8.8262C4.93904 8.9091 4.91036 8.97761 4.85299 9.03179C4.79563 9.08279 4.72072 9.10829 4.62826 9.10829ZM6.04831 9.10829C5.95586 9.10829 5.88254 9.08279 5.82836 9.03179C5.77418 8.97761 5.74868 8.9091 5.75186 8.8262L5.89531 3.71504C5.89849 3.62898 5.92718 3.56045 5.98136 3.50945C6.03554 3.45845 6.10568 3.43295 6.19172 3.43295C6.28418 3.43295 6.3575 3.46004 6.41168 3.51423C6.46586 3.56523 6.49136 3.63217 6.48818 3.71504L6.34472 8.8262C6.34154 8.91229 6.31286 8.98079 6.25868 9.03179C6.20449 9.08279 6.13436 9.10829 6.04831 9.10829ZM2.52929 2.18504V1.11403C2.52929 0.769782 2.63448 0.498845 2.84485 0.301221C3.05841 0.100407 3.34848 0 3.71504 0H5.5319C5.89849 0 6.18695 0.100407 6.39732 0.301221C6.61091 0.498845 6.71768 0.769782 6.71768 1.11403V2.18504H5.95745V1.16185C5.95745 1.02797 5.91281 0.919596 5.82359 0.836723C5.73754 0.753845 5.62277 0.712409 5.47931 0.712409H3.76763C3.6242 0.712409 3.50786 0.753845 3.41861 0.836723C3.33254 0.919596 3.28951 1.02797 3.28951 1.16185V2.18504H2.52929ZM0.358596 2.56754C0.262969 2.56754 0.178501 2.53248 0.105188 2.46235C0.0350628 2.38904 0 2.30298 0 2.20416C0 2.10854 0.0350628 2.02566 0.105188 1.95554C0.178501 1.88223 0.262969 1.84557 0.358596 1.84557H8.90273C8.99832 1.84557 9.08123 1.88063 9.15132 1.95076C9.22146 2.02088 9.25655 2.10535 9.25655 2.20416C9.25655 2.30298 9.22146 2.38904 9.15132 2.46235C9.08441 2.53248 9.00155 2.56754 8.90273 2.56754H0.358596ZM2.43844 10.6479C2.09419 10.6479 1.81529 10.5459 1.60172 10.3419C1.39135 10.1411 1.27819 9.86852 1.26225 9.52429L0.922785 2.4767H1.67344L2.01291 9.4382C2.01929 9.57847 2.06869 9.69479 2.16113 9.78724C2.25357 9.8797 2.36832 9.92588 2.50538 9.92588H6.74636C6.88663 9.92588 7.00295 9.8797 7.09541 9.78724C7.18782 9.69802 7.23723 9.58165 7.24363 9.4382L7.56395 2.4767H8.33373L7.99905 9.51951C7.98314 9.86374 7.86836 10.1379 7.65482 10.3419C7.44123 10.5459 7.16391 10.6479 6.82286 10.6479H2.43844Z"
      fill="white"
    />
  </svg>
);

function MyReviewItem({ review }: { review: MyReviewResponse }) {
  const queryClient = useQueryClient();

  const [shareOpen, setShareOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isPending, setIsPending] = useState(false); // 리뷰 저장 pending
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기
  const [modifyCompleteOpen, setModifyCompleteOpen] = useState(false);
  const [deleteCompleteOpen, setDeleteCompleteOpen] = useState(false);

  const myProfile = useMyPageStore((state) => state.myProfile);
  const selectedReviews = useBookmarkStore((state) => state.selectedReviews);
  const reviewCount = useBookmarkStore((state) => state.reviewCount);
  const toggleReview = useBookmarkStore((state) => state.toggleReview);

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

  const handleShare = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const isMobile = /Android|iphone|ipad|ipod/i.test(navigator.userAgent);

    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: '빵빵',
          text: `${'빵빵'} 리뷰를 확인해보세요!`,
          url: `${window.location.href}#${review.restaurantId}`,
        });
      } catch (err) {
        console.log('공유 중 에러 발생 : ' + err);
      }
    } else {
      setShareOpen(true);
    }
  };

  // 공유 클릭 시 주소 복사
  const clipLink = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.origin + `/detail-info/${review.restaurantId}`
      );
      setShareOpen(false);
      setIsCopiedModalOpen(true);
      setTimeout(() => setIsCopiedModalOpen(false), 1000);
    } catch (e) {
      console.error('복사하기 실패: ' + e);
    }
  };

  return (
    <>
      <div key={review.reviewId} className="flex rounded-2xl bg-[var(--gray-1)]">
        <div className="relative grow basis-0 px-5 py-3">
          <h3 className="text-xl font-bold">엔비햄버거</h3>
          <div className="flex gap-2 py-2">
            {<StarWithStroke rate={review.rating} />}
            <span className="font-medium text-[var(--gray-8)]">{review.rating}</span>
          </div>
          {review.reviewImageUrl && (
            <div>
              <img
                src={review.reviewImageUrl}
                className="aspect-square w-[40%] shrink-0 rounded-lg"
              />
            </div>
          )}
          <p className="font-sm font-medium">{review.content}</p>

          <div>
            <span className="mr-2 text-[10px] font-medium">{myProfile.nickname}</span>
            <span className="mr-2 text-[10px]">
              {review.createdAt.split('T')[0].replaceAll('-', '.')}
            </span>
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
                {(reviewCount[review.reviewId] ?? 0) > 99
                  ? '99+'
                  : (reviewCount[review.reviewId] ?? 0)}
              </span>
              <div
                className="relative flex size-6 cursor-pointer rounded-full bg-white"
                onClick={(e) => handleShare(e)}
              >
                <img
                  src={share}
                  className="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-[40%]"
                />
              </div>
            </div>
          </div>

          <div className="absolute right-2 top-3 flex gap-1 text-[10px] font-medium text-white">
            <button
              className="flex items-center gap-1 whitespace-nowrap rounded-2xl bg-[var(--sand)] px-2 py-1"
              onClick={() => setModifyOpen(true)}
            >
              <img src={edit} />
              수정하기
            </button>
            <button
              className="flex items-center gap-1 whitespace-nowrap rounded-2xl bg-[var(--sand)] px-2 py-1"
              onClick={() => setDeleteOpen(true)}
            >
              <DeleteSvg />
              삭제하기
            </button>
          </div>
        </div>
      </div>
      {
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          restName={'빵빵'}
          writer={myProfile.nickname}
          onCopy={clipLink}
        />
      }
      {
        <ModifyModal
          isOpen={modifyOpen}
          onClose={() => {
            setModifyOpen(false);
          }}
          setModifyCompleteOpen={(setting) => setModifyCompleteOpen(setting)}
          reviewId={review.reviewId}
        />
      }
      {<ModifyComplete isOpen={modifyCompleteOpen} onClose={() => setModifyCompleteOpen(false)} />}
      {
        <DeleteModal
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          setDeleteCompleteOpen={(setting) => setDeleteCompleteOpen(setting)}
          restName={'빵빵'}
          createdAt={review.createdAt.split('T')[0].replaceAll('-', '.')}
          reviewId={review.reviewId}
        />
      }
      {
        <DeleteCompleteModal
          isOpen={deleteCompleteOpen}
          onClose={() => {
            setDeleteCompleteOpen(false);
            queryClient.invalidateQueries({ queryKey: ['myReviews'] });
          }}
        />
      }

      {isCopiedModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/50">
          <div className="absolute top-12 flex h-12 w-[125px] items-center justify-center rounded-xl bg-white p-6 font-semibold text-[var(--primary)] shadow-lg">
            <img src={check} />
          </div>
        </div>
      )}
    </>
  );
}

export default MyReviewItem;
