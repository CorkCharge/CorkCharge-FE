import { useState, useEffect, useRef } from 'react';

import { StarRate } from '../common/StarRate';
import { ShareModal, ModifyModal, DeleteModal } from './ReviewModals';

import threeDots from '@/shared/assets/images/threedots.png';

interface MyReview {
  reviewId: number;
  restaurantId: number;
  userId: number;
  content: string;
  rating: number;
  createdAt: string;
}

function MyReviewItem({ review }: { review: MyReview }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const popUpRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const clickOutsideEvent = (e: MouseEvent) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', clickOutsideEvent);
    }
    return () => {
      document.removeEventListener('mousedown', clickOutsideEvent);
    };
  }, [isOpen]);

  return (
    <>
      <div key={review.reviewId} className="flex rounded-2xl bg-[var(--gray-1)]">
        <div className="relative grow basis-0 px-5 py-3">
          <h3 className="text-xl font-bold">엔비 햄버거</h3>
          <div className="mb-1 flex gap-2">
            {<StarRate rate={review.rating} />}
            <span className="font-medium text-[var(--gray-8)]">{review.rating}</span>
          </div>
          <p className="font-sm font-medium">{review.content}</p>
          <span className="text-xs">{review.createdAt.split('T')[0]}</span>
          <div className="absolute right-2 top-3 flex items-center gap-2">
            {/* <span className="rounded-xl bg-[rgba(218,203,182,0.3)] px-2 py-[6px] text-xs font-medium text-[var(--gray-8)]">
              저장 27
            </span> */}
            <img
              src={threeDots}
              className="h-[12px] w-[3px]"
              onClick={() => setIsOpen((prev) => !prev)}
            />
            <ul
              className={`${!isOpen && 'hidden'} absolute -right-1 top-[20px] w-[100px] rounded-[10px] bg-white px-2 py-3 text-center text-sm font-medium text-[var(--gray-5)]`}
              ref={popUpRef}
            >
              <li
                className="border-b border-[var(--gray-3)] p-1 hover:text-[--primary]"
                onClick={() => setShareOpen(true)}
              >
                공유하기
              </li>
              <li
                className="border-b border-[var(--gray-3)] p-1 hover:text-[--primary]"
                onClick={() => setModifyOpen(true)}
              >
                수정하기
              </li>
              <li
                className="border-b border-[var(--gray-3)] p-1 hover:text-[--primary]"
                onClick={() => setDeleteOpen(true)}
              >
                삭제하기
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-[150px] basis-1/3 rounded-e-2xl bg-[skyblue]"></div>
      </div>
      {
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          restId={review.restaurantId}
        />
      }
      {
        <ModifyModal
          isOpen={modifyOpen}
          onClose={() => setModifyOpen(false)}
          reviewId={review.reviewId}
        />
      }
      {
        <DeleteModal
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          restName={'jsndjf'}
          createdAt={review.createdAt.split('T')[0]}
          reviewId={review.reviewId}
        />
      }
    </>
  );
}

export default MyReviewItem;
