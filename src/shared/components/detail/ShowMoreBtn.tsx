// import React from 'react'

const ShowMoreBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="mb-12 mt-2 cursor-pointer" onClick={onClick}>
      <button className="flex h-[48px] w-[312px] items-center justify-center rounded-[10px] bg-[#FFFFFF] text-[16px] font-bold text-[##35353F] shadow-[0_2px_18px_rgba(0,0,0,0.2)]">
        리뷰 5개 더보기
      </button>
    </div>
  );
};

export default ShowMoreBtn;
