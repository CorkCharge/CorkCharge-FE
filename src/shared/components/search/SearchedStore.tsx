// import React from 'react'
import star from '@/shared/assets/star.svg';

interface SearchedStoreProps {
  name: string;
  rating: number;
  review: number;
  price: string;
  info: string[];
  imageUrls?: string | undefined;
}

const SearchedStore = ({ name, rating, review, price, info, imageUrls }: SearchedStoreProps) => {
  return (
    <div className="m-2 flex h-[196px] w-[353px] flex-col justify-between">
      <div>
        <div className="flex justify-between">
          <div className="text-[20px] font-bold">{name}</div>
          <div></div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img src={star} className="h-[16px] w-[16px]" />
            <span>{rating}</span>
            <span> 리뷰 total {review}</span>
          </div>
          <div className="flex gap-1">
            <button className="h-[28px] w-[54px] rounded-xl bg-[#DACBB64D] text-[12px] text-[#35353F]">
              예약
            </button>
            <button className="h-[28px] w-[54px] rounded-xl bg-[#DACBB64D] text-[12px] text-[#35353F]">
              공유
            </button>
            <button className="h-[28px] w-[54px] rounded-xl bg-[#DACBB64D] text-[12px] text-[#35353F]">
              저장
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <img src={imageUrls} />
        <div className="w-[210px]">
          <div className="flex gap-12 border border-x-0 pb-2 pt-2">
            <div className="text-[16px] font-bold">비용</div>
            <div>{price}</div>
          </div>
          <div className="flex w-[360px] gap-12 pb-2 pr-2 pt-2">
            <div className="whitespace-nowrap text-[16px] font-bold">기타</div>
            <div className="whitespace-pre-line break-words">
              {/* 쉼표를 개행문자로 변환하여 줄바꿈 처리*/}
              <div style={{ whiteSpace: 'pre-line' }}>
                {info?.join(', ').replace(/,\s*/g, '\n')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedStore;
