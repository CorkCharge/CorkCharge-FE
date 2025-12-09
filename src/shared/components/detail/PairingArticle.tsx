import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import PairingInfo from './PairingInfo';

const PairingArticle = (restaurant: RestaurantInfo) => {
  return (
    <div className="mx-4 mb-8 mt-4 h-auto rounded-b-lg shadow-2xl">
      <div className="flex h-[46px] items-center justify-center rounded-t-lg bg-gradient-to-r from-[#90212A]/65 to-[#DCDBE8] text-[18px] font-bold text-white">
        대표 메뉴 페어링
      </div>
      <div className="flex flex-col bg-white pt-4">
        <div className="mb-4 ml-4 mr-4">
          <span className="block text-[30px] font-medium text-[var(--gray-8)]">
            {restaurant.restaurantName}
          </span>
          <span className="text-[33px] font-bold text-[var(--gray-8)]">대표메뉴 페어링</span>
        </div>
      </div>
      <PairingInfo {...restaurant} />
    </div>
  );
};

export default PairingArticle;
