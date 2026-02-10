import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import RestaurantBox from '@/shared/components/corkagemap/list/RestaurantBox';
import { restaurantSearch } from '@/shared/apis/restaurant/restaurant.api';
import type { RestaurantSearchResponse } from '@/shared/apis/restaurant/restaurant.type';

import Back from '@/shared/assets/left_arrow.svg';

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
      } catch (e) {
        console.error('매장 검색 실패:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [keyword]);

  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <div
        style={{ boxShadow: '0 4px 7px 0px rgba(0, 0, 0, 0.1)' }}
        className="fixed flex h-[48px] w-full max-w-[var(--app-width)] flex-row place-content-between items-center bg-white"
      >
        <div className="flex flex-row gap-[10px]">
          <img
            src={Back}
            alt="왼쪽 화살표"
            className="ml-[13px] h-[20.34px] w-[11.46px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <p className="font-500 text-[16px]">{keyword}</p>
        </div>
      </div>
      <div className="w-full overflow-y-auto pb-[120px] pt-[48px]">
        {loading && <p>검색 중...</p>}
        {!loading && keyword && items.length === 0 && (
          <p className="flex h-[100px] items-center justify-center">검색 결과가 없습니다.</p>
        )}
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
            imageUrl={r.imageUrls?.[0] ?? ''}
            onClick={() => navigate(`/detail-info/${r.restaurantId}`)}
          />
        ))}
      </div>
    </main>
  );
};

export default SearchMapResult;
