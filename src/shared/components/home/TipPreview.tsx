// import React from 'react'
import type { TipList } from '@/shared/apis/tip/tipListApi';
import { useNavigate } from 'react-router-dom';

const TipPreview = ({ tipId, title, tipCategory, imageUrl }: TipList) => {
  const navigate = useNavigate();
  const handleGoTip = () => {
    console.log('해당 tipArticle로 이동');
    navigate(`/tipArticle/${tipId}`);
  };

  return (
    <div className="article relative cursor-pointer overflow-hidden">
      <img
        key={tipId}
        src={imageUrl}
        className="h-full w-full object-cover"
        loading="lazy"
        onClick={handleGoTip}
        // onError={(e) => {
        //   if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER;
        // }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-[1] p-4">
        <div className="mb-1 text-[14px] text-[#FFFFFF]">{tipCategory}</div>
        {/* 3줄까지만 출력하고 나머진 ... 처리 */}
        <div className="line-clamp-3 w-[140px] text-[17px] font-bold leading-tight text-white">
          {title}
        </div>
      </div>
    </div>
  );
};
export default TipPreview;
