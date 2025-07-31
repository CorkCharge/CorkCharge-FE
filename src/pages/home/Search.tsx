// import React from 'react'
import SearchBar from '../../shared/components/SearchBar';
import TopBar from '../../shared/components/TopBar';
// import RecommandList from '../../shared/components/RecommandList';
// import RecentList from '../../shared/components/RecentList';
import SearchedStoreList from '../../shared/components/SearchedStoreList';
import { useState } from 'react';

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div>
      <TopBar text="corkcharge" />
      <SearchBar searchDisabled={false} searchValue={searchValue} setSearchValue={setSearchValue} />
      {/* <RecommandList />
      <RecentList searchValue={searchValue} setSearchValue={setSearchValue} /> */}
      <SearchedStoreList />
    </div>
  );
};

export default Search;
