// import React from 'react'
import { useNavigate } from 'react-router-dom';
// import etc from '../../assets/detailPageImgs/etc.svg';
import type { CorkageScore } from '@/shared/apis/restaurant/corkageScoreApi';
import star from '../../assets/rating.svg';
import OptionMenu from './OptionMenu';

const CorkScore = ({
  reviewId,
  restaurantId,
  restaurantName,
  userName,
  content,
  rating,
  createdAt,
  imageUrl,
  bookmarkCount,
}: CorkageScore) => {
  const navigate = useNavigate();
  const goStore = () => {
    console.log('가게 상세 정보 페이지 이동');
    navigate(`/detailInfo/${restaurantId}`);
  };
  const stop: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={goStore}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goStore();
        }
      }}
      className="flex h-[144px] w-[357px] cursor-pointer justify-between rounded-2xl bg-[#F3F3F6]"
    >
      <div className="mb-4 ml-4 mt-4 flex w-[210px] flex-col pr-2">
        <div className="flex justify-between">
          <div className="text-[20px] font-bold">{restaurantName}</div>
          <div onClick={stop} className="flex items-center justify-center">
            <button className="mr-2 h-[25px] w-[46px] rounded-xl bg-[#DACBB64D] text-[10px]">
              저장 {bookmarkCount}
            </button>
            {/* <img className="h-[10px] w-[2px]" src={etc} /> */}
            <OptionMenu resId={restaurantId} resName={restaurantName} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img className="h-[15px] w-[96px]" src={star} />
          <div className="text-[16px]">{rating}</div>
        </div>
        <div className="mb-[2px] line-clamp-2 w-[180px] text-[14px]">{content}</div>
        <div className="flex gap-2 text-[10px]">
          <div>{userName}</div>
          <div>{createdAt}</div>
        </div>
      </div>
      <img
        key={reviewId}
        src={imageUrl ? imageUrl : 'https://placehold.co/128X144'}
        className="h-[144px] w-[128px] rounded-r-2xl"
      />
    </div>
  );
};

export default CorkScore;
