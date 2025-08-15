// import React from 'react'
import CorkScoreList from '@/shared/components/corkScore/CorkScoreList';
import RegionSearchBar from '@/shared/components/corkScore/RegionSearchBar';
import SelectBox from '@/shared/components/corkScore/SelectBox';
import TopBar from '@/shared/components/TopBar';

const CorkStores = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white pb-4">
      <TopBar text="콜키지스코어" />
      <div className="flex w-[393px] items-center justify-between pr-5">
        <div></div>
        <SelectBox />
      </div>
      <CorkScoreList />
      <RegionSearchBar />
    </div>
  );
};

export default CorkStores;
