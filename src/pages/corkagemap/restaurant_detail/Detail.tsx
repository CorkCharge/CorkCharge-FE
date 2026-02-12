import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DetailHeader from '@/shared/components/restaurant_detail/DetailHeader';
import DetailInfoSection from '@/shared/components/restaurant_detail/DetailInfoSection';
// import { fetchRestaurant, type RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import { fetchRestaurant, type RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
//import useRestaurantStore from '@/shared/store/useRestaurantStore';
import GroupSelector from '@/shared/components/home/GroupSelector';
import GroupList from '@/shared/components/home/GroupList';
interface DetailProps {
  restaurantId?: number;
}

const Detail = ({ restaurantId: propId }: DetailProps) => {
  const { id: paramId } = useParams<{ id: string }>();
  const targetId = propId || Number(paramId);
  const [restaurant, setRestaurant] = useState<RestaurantInfo>();
  //const setRestInfo = useRestaurantStore((state) => state.setRestInfo);
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false);

  useEffect(() => {
    if (!targetId) {
      console.error('잘못된 가게 id');
      return;
    }

    (async () => {
      try {
        // API 호출 시 targetId 사용
        const res = await fetchRestaurant(targetId);
        setRestaurant(res);
        //setRestInfo(res);
      } catch {
        console.error('API 호출 실패');
      }
    })();
  }, [targetId]);

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
            time={restaurant.openingHours}
            phone={restaurant.phone}
            mainImageUrl={restaurant.mainImageUrl}
            corkageOption={restaurant.corkageOptions}
            corkagePrice={restaurant.corkagePrice}
            isScrap={restaurant.scrap ?? false}
            onOpenSaveList={() => setIsGroupSelectorOpen(true)}
          />
        ) : (
          <p className="flex min-h-[100svh] items-center justify-center bg-inherit">
            가게 정보를 불러오는데 실패하였습니다.
          </p>
        )}
      </div>

      {restaurant && <DetailInfoSection {...restaurant} />}

      {/* [추가] Detail 안에서 GroupSelector 직접 렌더링 */}
      {restaurant && (
        <GroupSelector
          isOpen={isGroupSelectorOpen}
          topSnapVh={17.8}
          onClose={() => setIsGroupSelectorOpen(false)}
        >
          <GroupList
            onClose={() => setIsGroupSelectorOpen(false)}
            // 내가 API로 받아온 restaurant 객체에서 바로 전달
            restaurantName={restaurant.restaurantName}
            restaurantId={restaurant.restaurantId}
          />
        </GroupSelector>
      )}
    </div>
  );
};

export default Detail;
