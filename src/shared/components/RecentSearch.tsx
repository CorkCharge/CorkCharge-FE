// import React from 'react';
import search from '../../shared/assets/searchBlack.svg';
import stroke from '../../shared/assets/stroke.svg';

interface recentSearchProps {
  text?: string;
  // searchValue?: string;
  setSearchValue?: (value: string) => void;
}

const RecentSearch = ({ text, setSearchValue }: recentSearchProps) => {
  const onclick = () => {
    console.log('해당 검색어 검색');
  };
  const handleStroke = () => {
    console.log('해당 검색어 input box에 저장');
    setSearchValue?.(text || '');
  };

  return (
    <div
      onClick={onclick}
      className="flex h-[56px] w-[361px] cursor-pointer items-center justify-between border border-x-0 border-b-2 border-t-0 border-solid border-[#DBDDE1] pl-2 pr-4"
    >
      <div className="flex items-center gap-2">
        <img src={search} className="h-[19px] w-[18px]" />
        <div>{text}</div>
      </div>
      <img src={stroke} onClick={handleStroke} className="h-[12px] w-[12px]" />
    </div>
  );
};

export default RecentSearch;
