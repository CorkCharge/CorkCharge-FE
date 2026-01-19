import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DetailHeader from '@/shared/components/detail/DetailHeader';
import DetailInfoSection from '@/shared/components/detail/DetailInfoSection';
// import { fetchRestaurant, type RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import { fetchRestaurant, type RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import useRestaurantStore from '@/shared/store/useRestaurantStore';

const Info = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);

  const [restaurant, setRestaurant] = useState<RestaurantInfo>();

  const setRestInfo = useRestaurantStore((state) => state.setRestInfo);

  useEffect(() => {
    if (!id) {
      console.error('잘못된 가게 id');
      return;
    }

    (async () => {
      try {
        const res = await fetchRestaurant(restaurantId);
        // const res = {
        //   restaurantId: 88,
        //   restaurantName: '램니쿠야',
        //   address: '서울 광진구 아차산로 395',
        //   phone: '0507-1404-1532',
        //   rating: 4.2,
        //   scrap: true,
        //   scrapCount: 2,
        //   mainImageUrl: '',
        //   menuImageUrl:
        //     'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/restaurant/%EB%9E%A8%EB%8B%88%EC%BF%A0%EC%95%BC_%EB%A9%94%EB%89%B4%EC%82%AC%EC%A7%84.png',
        //   corkagePrice: '병당 5000원',
        //   corkageOptions: ['잔 제공', '얼음 제공'],
        //   representMenu: '양갈비',
        //   pairingAlcohol: '월계관 준마이',
        //   pairingDescription:
        //     '월계관 준마이의 은은한 쌀 내음과 부드러운 목넘김이 양고기 징기스칸의 진한 육즙과 만나 풍미를 더욱 깊게 만들어줍니다.',
        //   pairingImageUrl:
        //     'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/corkage/%EB%9E%A8%EB%8B%88%EC%BF%A0%EC%95%BC_%EC%A3%BC%EB%A5%98%EC%82%AC%EC%A7%84.png',
        //   openingHours: '매일 16:00 - 24:00',
        // };
        setRestaurant(res);
        setRestInfo(res);
      } catch {
        console.error('API  호출 실패');
      }
    })();
  }, [restaurantId, id]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        {restaurant ? (
          <DetailHeader
            resId={restaurant.restaurantId}
            name={restaurant.restaurantName}
            rating={restaurant.rating}
            adr={restaurant.address}
            isOpen={true}
            time="4:00"
            phone={restaurant.phone}
            mainImageUrl={restaurant.mainImageUrl}
          />
        ) : (
          <p className="flex min-h-[100svh] items-center justify-center bg-inherit">
            가게 정보를 불러오는데 실패하였습니다.
          </p>
        )}
      </div>

      {restaurant && <DetailInfoSection {...restaurant} />}
    </div>
  );
};

export default Info;
