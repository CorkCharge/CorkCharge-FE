// import React from 'react'
import HotStoreCard from './HotStoreCard';
import { useEffect, useState } from 'react';
import { fetchHotRestaurant, type HotRestaurant } from '@/shared/apis/restaurant/hotStoreApi';

const HotStoreList = () => {
  const [hotRestaurants, setHotRestaurants] = useState<HotRestaurant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchHotRestaurant();
        console.table(hotRestaurants);
        console.log('one item', hotRestaurants[0]);
        console.log(res);
        setHotRestaurants(res);
      } catch (err) {
        console.error('API  호출 실패');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-[393px]">
      <div className="flex flex-col items-center justify-center gap-4">
        {hotRestaurants?.map((r) => (
          <HotStoreCard
            // key={r.restaurantId}
            imgUrl={r.imageUrl}
            keep={r.bookmarkCount}
            name={r.restaurantName} //"뉴웨이브 서울"
            local={r.address} //"1.2km 서울시 성동구 상수동 340-2"
            //1.2km 정보 추가 필요
            time={r.openingHours} //"평일 17:00~24:00"
            //closeTime 추가 필요
          />
        ))}
      </div>
    </div>
  );
};
export default HotStoreList;
