import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import DetailHeader from '@/shared/components/detail/DetailHeader';
import DetailInfoSection from '@/shared/components/detail/DetailInfoSection';
import { fetchRestaurant, type RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import useRestaurantStore from '@/shared/store/useRestaurantStore';

const Info = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);

  const [restaurant, setRestaurant] = useState<RestaurantInfo>();

  const [isLoading, setIsLoading] = useState(true);
  const [fetchFail, setFetchFail] = useState(false);

  const setRestInfo = useRestaurantStore((state) => state.setRestInfo);

  useEffect(() => {
    if (!id) {
      console.error('잘못된 가게 id');
      return;
    }

    getRestaurantInfo();
  }, [id]);

  // 가게 정보 가져오기
  const getRestaurantInfo = async () => {
    setIsLoading(true);
    try {
      const res = await fetchRestaurant(restaurantId);
      setRestaurant(res);
      setRestInfo(res);
    } catch (e) {
      setFetchFail(true);
      console.error('가게 정보 가져오기 실패: ' + e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeader = () => {
    if (fetchFail) {
      return (
        <p className="flex min-h-[100svh] items-center justify-center bg-inherit">
          가게 정보를 불러오는데 실패하였습니다.
        </p>
      );
    }

    if (isLoading) {
      return (
        <div className="flex h-[70svh] w-full items-center justify-center">
          <ClipLoader color="var(--primary)" />
        </div>
      );
    }

    if (!restaurant) {
      return (
        <p className="flex min-h-[100svh] items-center justify-center bg-inherit">
          가게 정보를 불러오는데 실패하였습니다.
        </p>
      );
    }

    return <DetailHeader restaurant={restaurant} />;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">{renderHeader()}</div>

      {restaurant && <DetailInfoSection restaurant={restaurant} />}
    </div>
  );
};

export default Info;
