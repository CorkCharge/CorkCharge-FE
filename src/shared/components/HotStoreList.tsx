// import React from 'react'
import type { Restaurant } from '@/shared/apis/restaurant/filterRegion';
import { fetchHotRestaurant, type HotRestaurant } from '@/shared/apis/restaurant/hotStoreApi';
import { useEffect, useState } from 'react';
import HotStoreCard from './HotStoreCard';

interface HotStoreListProps {
  filteredData?: Restaurant[]; // 필터링된 데이터를 받을 수 있는 prop
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

  return (
    <div className="w-[393px]">
      <div className="flex flex-col items-center justify-center gap-4">
        {filteredData
          ? // 필터링된 데이터 렌더링
            filteredData.map((r, index) => (
              <HotStoreCard
                key={index}
                restaurantId={r.restaurantId}
                imgUrl={r.imageUrl || '/default-image.jpg'}
                keep={r.bookmarkCount || 0}
                name={r.name}
                local={r.address}
                // time={r.openingHours || '영업시간 정보 없음'}
              />
            ))
          : // 기본 핫 레스토랑 데이터 렌더링
            hotRestaurants.map((r) => (
              <HotStoreCard
                key={r.restaurantId}
                restaurantId={r.restaurantId}
                imgUrl={r.imageUrl}
                keep={r.bookmarkCount}
                name={r.restaurantName}
                local={r.address}
                // time={r.openingHours}
              />
            ))}
      </div>
    </div>
  );
};

export default HotStoreList;
