// import React from 'react'
import RecentSearch from './recentSearch';

interface recentSearchProps {
  searchValue?: string;
  setSearchValue?: (value: string) => void;
}

const RecentList = ({ setSearchValue }: recentSearchProps) => {
  return (
    <div className="mt-4 flex flex-col items-center">
      <RecentSearch
        text="레스토랑 드 모간"
        // searchValue={searchValue}
        setSearchValue={setSearchValue}
      />{' '}
      <RecentSearch
        text="수제버거 마트집"
        // searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <RecentSearch
        text="한우네 삼겹살"
        // searchValue={searchValue}
        setSearchValue={setSearchValue}
      />{' '}
      <RecentSearch
        text="사케에 라면집"
        // searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  );
};
export default RecentList;
