// import React from 'react'
// import SearchedStore from '@/shared/components/search/SearchedStore';
import TopBar from '../../shared/components/TopBar';
// import RecommandList from '../../shared/components/RecommandList';
import RecentList from '../../shared/components/RecentList';
import { useState } from 'react';
import MapSearchBar from '@/shared/components/search/MapSearchBar';
import { useNavigate } from 'react-router-dom';

const SearchMap = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const navigate = useNavigate();

  const directSearch = (value: string) => {
    if (!value || value.trim() === '') return;
    navigate(`/searchMap/result?keyword=${encodeURIComponent(value)}`);
  };

  return (
    <div className="flex flex-col items-center">
      <TopBar text="corkcharge" />
      <MapSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        directSearch={directSearch}
      />
      {/* <RecommandList setSearchValue={setSearchValue} /> */}
      <RecentList
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        directSearch={directSearch}
      />
    </div>
  );
};

export default SearchMap;
