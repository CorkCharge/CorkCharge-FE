// import React from 'react';
import DetailHeader from '@/shared/components/detail/DetailHeader';
import DetailInfoSection from '@/shared/components/detail/DetailInfoSection';
import { useState, useEffect } from 'react';
import { fetchRestaurant, type RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import { useParams } from 'react-router-dom';

const Info = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);
  const [restaurant, setRestaurant] = useState<RestaurantInfo>();

  useEffect(() => {
    if (!id) {
      console.error('잘못된 가게 id');
      return;
    }

    //let cancelled = false;
    // const fetchData = async () => {
    (async () => {
      try {
        const res = await fetchRestaurant(restaurantId);
        console.log(res);
        setRestaurant(res);
      } catch {
        console.error('API  호출 실패');
      }
      // };
    })();
    return () => {
      //cancelled = true;
    };
    // fetchData();
  }, [restaurantId, id]);

  //reviewCount 는 어디에 써야 하는지? 대신 저장 개수가 필요함
  return (
    <div className="flex flex-col items-center bg-white">
      {/* <div>{restaurant?.address}</div>
      <div>{restaurant?.corkageOptions}</div>
      <div>{restaurant?.phone}</div>
      <div>{restaurant?.reviews[0].content}</div> */}
      <div>
        {restaurant && (
          <DetailHeader
            resId={restaurant.restaurantId}
            name={restaurant.restaurantName}
            rating={restaurant.rating}
            // alias="광진구 햄버거 맛집"
            isOpen={true}
            time="4:00"
            phone={restaurant.phone}
            mainImageUrl={restaurant.mainImageUrl}
          />
        )}
      </div>
      {restaurant && <DetailInfoSection {...restaurant} />}
      {/* restaurant 내 필드를 펼쳐서 props 로 전달 */}
    </div>
  );
};

export default Info;
