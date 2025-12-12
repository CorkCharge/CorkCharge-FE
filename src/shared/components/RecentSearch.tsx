// import React from 'react';
import search from '../../shared/assets/searchBlack.svg';
import transhCan from '@/shared/components/search/assets/trash-can.svg';

interface recentSearchProps {
  text?: string;
  // searchValue?: string;
  setSearchValue?: (value: string) => void;
  directSearch?: (value: string) => void;
  handleRemove: () => void;
}

const RecentSearch = ({ text, setSearchValue, directSearch, handleRemove }: recentSearchProps) => {
  const onclick = () => {
    directSearch?.(text || '');
  };

  return (
    <div
      onClick={onclick}
      className="flex h-[56px] w-full cursor-pointer items-center justify-between border border-x-0 border-b-2 border-t-0 border-solid border-[#DBDDE1] pl-2 pr-4"
    >
      <div className="flex items-center gap-2">
        <img src={search} className="h-[19px] w-[18px]" />
        <div>{text}</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-[var(--gray-6)]">12.12</span>
        <img
          src={transhCan}
          onClick={(e) => {
            e.stopPropagation(); // 부모 div의 onclick 실행 방지
            handleRemove();
          }}
          className="h-[12px] w-[12px]"
        />
      </div>
    </div>
  );
};

export default RecentSearch;
