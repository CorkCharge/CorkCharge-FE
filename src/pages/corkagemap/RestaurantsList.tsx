import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/shared/components/corkagemap/list/Header';
import RestaurantBox from '@/shared/components/corkagemap/list/RestaurantBox';
import { getClusterList } from '@/shared/apis/map/mapApi';
import type { ClusterListItem } from '@/shared/types/map';

type LocationState = {
  level: 'dong' | 'sigungu' | 'sido';
  areaName: string;
  restaurantIds: number[];
};

const RestaurantsList = () => {
  const { state } = useLocation() as { state?: LocationState };
  const [items, setItems] = useState<ClusterListItem[]>([]);
  const title = state?.areaName ?? '목록';

  useEffect(() => {
    console.log('RestaurantsList mounted with state:', state);
  }, [state]);

  /*
  useEffect(() => {
    if (!state?.restaurantIds?.length) return;
    (async () => {
      try {
        const res = await getClusterList(state.restaurantIds);
        setItems(res.data);
      } catch (e) {
        console.error('클러스터 목록 조회 실패:', e);
      }
    })();
  }, [state?.restaurantIds]);
*/

  useEffect(() => {
    if (!state?.restaurantIds?.length) return;
    (async () => {
      try {
        console.log('[RestaurantsList] getClusterList 호출 직전:', state.restaurantIds);

        const res = await getClusterList(state.restaurantIds);

        console.log('[RestaurantsList] getClusterList 응답:', res);
        setItems(res.data);
      } catch (e) {
        console.error('클러스터 목록 조회 실패:', e);
      }
    })();
  }, [state?.restaurantIds]);

  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <Header title={title} />
      <div className="overflow-y-auto pb-[120px] pt-[48px]">
        {items.map((r) => (
          <RestaurantBox
            key={r.restaurantId}
            name={r.name}
            rating={r.rating}
            reviewCount={r.reviewCount}
            corkagePrice={r.corkagePrice}
            corkageOptions={r.corkageOptions}
            imageUrl={r.imageUrl ?? ''} // 빈 문자열이면 onError에서 Placeholder로 대체
          />
        ))}
      </div>
    </main>
  );
};

export default RestaurantsList;
