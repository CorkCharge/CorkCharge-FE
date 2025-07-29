// import React from 'react'
import HotStoreCard from './HotStoreCard';

const HotStoreList = () => {
  return (
    <div className="flex flex-col gap-4">
      <HotStoreCard
        keep={198}
        name="성수 누메르도스"
        local="1.2km 서울시 성동구 상수동 340-2"
        time="평일 17:00~24:00"
      />
      <HotStoreCard
        keep={173}
        name="뉴웨이브 서울"
        local="1.2km 서울시 성동구 상수동 340-2"
        time="평일 17:00~24:00"
      />
      <HotStoreCard
        keep={198}
        name="성수 누메르도스"
        local="1.2km 서울시 성동구 상수동 340-2"
        time="평일 17:00~24:00"
      />
      <HotStoreCard
        keep={198}
        name="성수 누메르도스"
        local="1.2km 서울시 성동구 상수동 340-2"
        time="평일 17:00~24:00"
      />
    </div>
  );
};
export default HotStoreList;
