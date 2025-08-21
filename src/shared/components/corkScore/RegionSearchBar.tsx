// import React from 'react'

const RegionSearchBar = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="fixed bottom-[95px]">
      <button
        onClick={onClick}
        className="flex h-[48px] w-[312px] items-center justify-center rounded-[10px] bg-[#90212A] text-[16px] font-bold text-[#FFFFFF]"
      >
        지역 검색
      </button>
    </div>
  );
};

export default RegionSearchBar;
