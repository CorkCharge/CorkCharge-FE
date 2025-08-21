// import React from 'react'
import { fetchHotRestaurant, type HotRestaurant } from '@/shared/apis/restaurant/hotStoreApi';
import { useEffect, useState } from 'react';
import HotStoreCard from './HotStoreCard';

interface HotStoreListProps {
  filteredData?: any[]; // 필터링된 데이터를 받을 수 있는 prop
}

const HotStoreList = ({ filteredData }: HotStoreListProps) => {
  const [hotRestaurants, setHotRestaurants] = useState<HotRestaurant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchHotRestaurant();
        console.table(hotRestaurants);
        console.log('one item', hotRestaurants[0]);
        console.log(res);
        setHotRestaurants(res);
      } catch {
        console.error('API  호출 실패');
      }
    };

    // 필터링된 데이터가 있으면 사용하고, 없으면 기본 데이터를 가져옴
    if (!filteredData) {
      fetchData();
    }
  }, [filteredData]);

  // 필터링된 데이터가 있으면 그것을 사용하고, 없으면 기본 핫 레스토랑 데이터 사용
  const displayData = filteredData || hotRestaurants;

  return (
    <div className="w-[393px]">
      <div className="flex flex-col items-center justify-center gap-4">
        {displayData?.map((r, index) => (
          <HotStoreCard
            key={filteredData ? index : r.restaurantId}
            restaurantId={filteredData ? r.restaurantId : '1'}
            imgUrl={filteredData ? r.imageUrl || '/default-image.jpg' : r.imageUrl}
            keep={filteredData ? r.bookmarkCount || 0 : r.bookmarkCount}
            name={filteredData ? r.name : r.restaurantName}
            local={filteredData ? r.address : r.address}
            time={filteredData ? r.openingHours || '영업시간 정보 없음' : r.openingHours}
          />
        ))}
      </div>
    </div>
  );
};

export default HotStoreList;
