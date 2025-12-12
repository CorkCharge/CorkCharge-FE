import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RecentList from '../../shared/components/RecentList';
import MapSearchBar from '@/shared/components/search/MapSearchBar';
import Header from '@/shared/components/common/Header';

const SearchMap = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const navigate = useNavigate();

  const directSearch = (value: string) => {
    if (!value || value.trim() === '') return;
    navigate(`/searchMap/result?keyword=${encodeURIComponent(value)}`);
  };

  return (
    <div className="px-4">
      <Header title="corkchage" type="back" backFn={() => navigate('/home')} />
      <div className="flex flex-col items-center">
        <MapSearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          directSearch={directSearch}
        />
        <RecentList
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          directSearch={directSearch}
        />
      </div>
    </div>
  );
};

export default SearchMap;
