// import React from 'react';
import etc from '@/shared/assets/detailPageImgs/etc.svg';
import type { reviewProps } from '@/shared/apis/restaurant/corkageApi';
import { StarRate } from '../common/StarRate';

interface reviewArticleProps {
  name: string;
  review: reviewProps;
}
//   writer: string; //"Charlie",
//   content: string; //"딱히?!",
//   rating: number; //2,
//   createdAt: string; //"2025-07-21T20:02:52.879934",
//   imageUrls: string[] | null; //[]

export const ReviewArticle = ({ name, review }: reviewArticleProps) => {
  return (
    <div
      className="relative mb-2 flex h-[144px] w-full justify-between rounded-2xl bg-[#F3F3F6] px-4"
      id={review.reviewId.toString()}
    >
      <div className="mb-4 mt-4 flex w-full grow basis-0 flex-col">
        <div className="mb-2 flex w-full justify-between">
          <div className="text-[20px] font-bold">{name}</div>
          <div className="mr-3 flex items-center">
            <button className="mr-2 h-6 rounded-xl bg-[#DACBB64D] px-2 text-[10px]">
              저장 {review.savedCount}
            </button>
            <img src={etc} className="h-4 w-[9px]" />
          </div>
        </div>
        <div
          className="max-h-[55px] w-full overflow-hidden pr-5 text-[14px] text-sm"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
          }}
        >
          {/* 몰트향과 완벽하게 어우러지는 조화로운 페어링입니다. */}
          {review.content}
        </div>

        <div className="flex">
          <StarRate rate={review.rating} />
          <span>{review.rating}</span>
        </div>

        <div className="absolute bottom-2 flex gap-2 text-[10px]">
          <div>{review.writer}</div>
          <div>{review.createdAt.split('T')[0]}</div>
        </div>
      </div>

      {review.imageUrls!.length > 0 ? (
        <img
          src={review.imageUrls?.[0]}
          className="-mr-4 h-[144px] w-[33%] max-w-[150px] rounded-r-2xl"
        />
      ) : (
        <div className="-mr-4 h-[144px] w-[33%] max-w-[150px] rounded-r-2xl bg-[var(--gray-8)]"></div>
      )}

      {/* <img
        //imageUrls 가 빈 배열일 경우 placeholder 게시
        src={review.imageUrls?.find(Boolean) ?? 'https://placehold.co/128x144'}
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/128x144';
        }}
        // src={review.imageUrls ? review.imageUrls[0] : 'https://placehold.co/128x144'}
        className="h-[144px] w-[30%] rounded-r-2xl"
      /> */}
    </div>
  );
};
