import { useState } from 'react';
import DetailInfo from './DetailInfo';
import StoreInfo from './StoreInfo';
import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import ReviewInfo from './ReviewInfo';

interface DetailInfoSectionProps {
  restaurant: RestaurantInfo;
}

const DetailInfoSection = ({ restaurant }: DetailInfoSectionProps) => {
  // 0: 페어링 정보, 1: 가게 정보, 2: 리뷰
  const [corkSelect, setCorkSelect] = useState(0);

  return (
    <div className="w-full">
      <div className="mb-5 flex h-10 w-full items-center justify-between gap-2 border-b border-[var(--gray-2)] px-6 text-sm">
        <button
          onClick={() => setCorkSelect(0)}
          className={`h-full flex-1 border-x-0 border-b-[2px] border-t-0 border-solid font-medium ${corkSelect === 0 ? 'border-black text-black' : 'border-transparent text-[var(--gray-6)]'}`}
        >
          페어링 정보
        </button>
        <button
          onClick={() => setCorkSelect(1)}
          className={`h-full flex-1 border-x-0 border-b-[2px] border-t-0 border-solid font-medium ${corkSelect === 1 ? 'border-black text-black' : 'border-transparent text-[var(--gray-6)]'}`}
        >
          가게 정보
        </button>
        <button
          onClick={() => setCorkSelect(2)}
          className={`h-full flex-1 border-x-0 border-b-[2px] border-t-0 border-solid font-medium ${corkSelect === 2 ? 'border-black text-black' : 'border-transparent text-[var(--gray-6)]'}`}
        >
          리뷰
        </button>
      </div>

      {corkSelect === 0 && <DetailInfo restaurant={restaurant} />}
      {corkSelect === 1 && <StoreInfo restaurant={restaurant} />}
      {corkSelect === 2 && (
        <ReviewInfo storeName={restaurant.restaurantName} restId={restaurant.restaurantId} />
      )}
    </div>
  );
};

export default DetailInfoSection;
