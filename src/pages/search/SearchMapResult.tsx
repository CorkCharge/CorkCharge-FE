import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/shared/components/corkagemap/list/Header';
import RestaurantBox from '@/shared/components/corkagemap/list/RestaurantBox';
import { restaurantSearch } from '@/shared/apis/restaurant/restaurant.api';
import type { RestaurantSearchResponse } from '@/shared/apis/restaurant/restaurant.type';

const SearchMapResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const navigate = useNavigate();
  const [items, setItems] = useState<RestaurantSearchResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword) return;

    (async () => {
      try {
        setLoading(true);

        // 1. 검색으로 기본 매장 리스트 가져오기
        const res = await restaurantSearch({ keyword });
        setItems(res.restaurants);

        // const detailed = await Promise.all(
        //   res.map(async (r) => {
        //     try {
        //       const detail = await fetchRestaurant(r.restaurantId);
        //       return { ...r, ...detail } as RestaurantInfo;
        //     } catch (err) {
        //       console.error(`상세 호출 실패 (id: ${r.restaurantId})`, err);
        //       return undefined; // 실패 시 undefined
        //     }
        //   })
        // );

        // if (detailed) {
        //   // undefined 제거
        //   setItems(detailed.filter((r): r is RestaurantInfo => r !== undefined));
        // }
      } catch (e) {
        console.error('매장 검색 실패:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [keyword]);

  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <Header
        title={keyword}
        className="max-w-[var(--app-width)]"
        style={{ boxShadow: '0 4px 7px 0px rgba(0, 0, 0, 0.1)' }}
      />
      <div className="w-full overflow-y-auto pb-[120px] pt-[48px]">
        {loading && <p>검색 중...</p>}
        {!loading && items.length === 0 && <p>검색 결과가 없습니다.</p>}
        {items.map((r) => (
          <RestaurantBox
            key={r.restaurantId}
            resId={r.restaurantId}
            name={r.name}
            // address={r.address ?? ''}
            rating={r.rating ?? 0}
            reviewCount={r.reviewCount ?? 0}
            corkagePrice={(r.corkagePrice ?? 0).toString()}
            corkageOptions={r.corkageOptions ?? []}
            imageUrl={r.imageUrls[0] ?? ''}
            onClick={() => navigate(`/detail-info/${r.restaurantId}`)}
          />
        ))}
      </div>
    </main>
  );
};

export default SearchMapResult;
