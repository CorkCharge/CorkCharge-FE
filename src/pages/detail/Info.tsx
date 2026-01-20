import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DetailHeader from '@/shared/components/detail/DetailHeader';
import DetailInfoSection from '@/shared/components/detail/DetailInfoSection';
import { fetchRestaurant, type RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import useRestaurantStore from '@/shared/store/useRestaurantStore';
import { fetchStoreReviews } from '@/shared/apis/review/review.api';
import { type StoreReviewResponse } from '@/shared/apis/review/review.type';

const Info = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);

  const [restaurant, setRestaurant] = useState<RestaurantInfo>();
  const [reviews, setReviews] = useState<StoreReviewResponse[]>([]);

  const setRestInfo = useRestaurantStore((state) => state.setRestInfo);

  useEffect(() => {
    if (!id) {
      console.error('잘못된 가게 id');
      return;
    }

    getRestaurantInfo();
    getReviews();
  }, [restaurantId, id]);

  // 가게 정보 가져오기
  const getRestaurantInfo = async () => {
    try {
      const res = await fetchRestaurant(restaurantId);
      setRestaurant(res);
      setRestInfo(res);
    } catch (e) {
      console.error('가게 정보 가져오기 실패: ' + e);
    }
  };

  // 가게 리뷰들 가져오기
  const getReviews = async () => {
    try {
      const res = await fetchStoreReviews(restaurantId);
      setReviews(res);
    } catch (e) {
      console.error('가게 리뷰 가져오기 실패: ' + e);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        {restaurant ? (
          <DetailHeader restaurant={restaurant} />
        ) : (
          <p className="flex min-h-[100svh] items-center justify-center bg-inherit">
            가게 정보를 불러오는데 실패하였습니다.
          </p>
        )}
      </div>

      {restaurant && <DetailInfoSection restaurant={restaurant} reviews={reviews} />}
    </div>
  );
};

export default Info;
