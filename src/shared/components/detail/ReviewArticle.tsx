// import React from 'react';
import etc from '@/shared/assets/detailPageImgs/etc.svg';
import type { reviewProps } from '@/shared/apis/restaurant/corkageApi';

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
    <div className="relative mb-2 flex h-[144px] w-[357px] justify-between rounded-2xl bg-[#F3F3F6]">
      <div className="mb-4 ml-4 mt-4 flex flex-col gap-2">
        <div className="flex">
          <div className="mr-12 text-[20px] font-bold">{name}</div>
          <button className="mr-2 w-[46px] rounded-xl bg-[#DACBB64D] text-[10px]">저장 27</button>
          <img src={etc} />
        </div>
        <div className="w-[180px] text-[14px]">
          {/* 몰트향과 완벽하게 어우러지는 조화로운 페어링입니다. */}
          {review.content}
        </div>
        <div className="absolute bottom-2 flex gap-2 text-[10px]">
          <div>{review.writer}</div>
          <div>{review.createdAt}</div>
        </div>
      </div>

      <img
        //imageUrls 가 빈 배열일 경우 placeholder 게시
        src={review.imageUrls?.find(Boolean) ?? 'https://placehold.co/128x144'}
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/128x144';
        }}
        // src={review.imageUrls ? review.imageUrls[0] : 'https://placehold.co/128x144'}
        className="rounded-r-2xl"
      />
    </div>
  );
};
