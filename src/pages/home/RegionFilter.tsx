// import React from 'react'
import RegionSelector from '../../shared/components/RegionSelector';
import TopBar from '../../shared/components/TopBar';
import Search from '../../shared/assets/search.svg';

//Todo: input box 컴포넌트 분리
//Todo: 상단바 x버튼 추가
const RegionFilter = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <TopBar text="지역설정" />
      <div className="flex h-[40px] w-[361px] items-center rounded-br-full rounded-tl-full bg-[#F3F3F6] pl-6 pr-6">
        <input
          type="text"
          placeholder="지역명을 검색하세요"
          //   onClick={onclick}
          //   onChange={(e) => setSearchValue?.(e.target.value)}
          className="flex-1 bg-transparent text-gray-500 placeholder-gray-400 outline-none"
        />
        <img src={Search} className="cursor-pointer"></img>
      </div>
      <RegionSelector />
    </div>
  );
};
export default RegionFilter;
