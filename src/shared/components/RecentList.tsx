// import React from 'react'
import RecentSearch from './RecentSearch';

interface recentSearchProps {
  searchValue?: string;
  setSearchValue?: (value: string) => void;

  directSearch?: (value: string) => void;
}

const RecentList = ({ setSearchValue, directSearch }: recentSearchProps) => {
  return (
    <div className="mt-4 flex flex-col items-center">
      <RecentSearch
        text="모다미육"
        // searchValue={searchValue}
        directSearch={directSearch}
        setSearchValue={setSearchValue}
      />
      <RecentSearch
        text="만경상회"
        // searchValue={searchValue}
        directSearch={directSearch}
        setSearchValue={setSearchValue}
      />
      <RecentSearch
        text="재즈라운지"
        directSearch={directSearch}
        // searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <RecentSearch
        text="브네"
        directSearch={directSearch}
        // searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  );
};
export default RecentList;
