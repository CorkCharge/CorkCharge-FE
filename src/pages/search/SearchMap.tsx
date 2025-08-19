// import React from 'react'
import SearchedStore from '@/shared/components/search/SearchedStore';
import TopBar from '../../shared/components/TopBar';
// import RecommandList from '../../shared/components/RecommandList';
// import RecentList from '../../shared/components/RecentList';
// import { useState } from 'react';
// import MapSearchBar from '@/shared/components/search/MapSearchBar';

const SearchMap = () => {
  // const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className="flex flex-col items-center">
      <TopBar text="corkcharge" />
      {/* <MapSearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <RecommandList />
      <RecentList searchValue={searchValue} setSearchValue={setSearchValue} /> */}
      <SearchedStore
        name="앤비햄버거"
        rating={4.2}
        review={1250}
        price="병당 1만원"
        info={['잔 제공', '얼음 제공', '한병 무료']}
        imageUrls="https://placehold.co/126x127"
      />
    </div>
  );
};

export default SearchMap;
