// import React from 'react'
import SearchedStore from './SearchedStore';

const SearchedStoreList = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <SearchedStore
        name="로니로티"
        local="500m 서울 광진구 어대로 1층"
        open={true}
        lastOrder="21:00"
        price={10000}
      />
      <SearchedStore
        name="뉴웨이브서울 건대점"
        local="1.2km 서울시 상동구 상수동 340-2"
        open={true}
        lastOrder="21:00"
        price={13000}
      />
      <SearchedStore
        name="언더다이닝 건대본점"
        local="500m 서울 광진구 어대로 1층"
        open={true}
        lastOrder="21:30"
        price={0}
      />
      <SearchedStore
        name="언더다이닝 건대본점"
        local="1.2km 서울시 상동구 상수동 340-2"
        open={false}
        lastOrder="21:30"
        price={0}
      />
    </div>
  );
};

export default SearchedStoreList;
