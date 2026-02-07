import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';

import link from '@/shared/components/detail/assets/link.svg';

const PairingInfo = (restaurant: RestaurantInfo) => {
  return (
    <div>
      <div className="relative">
        <div className="grid w-full grid-cols-2 gap-3 px-0">
          <div
            className={`relative ${!restaurant.menuImageUrl && 'bg-gray-500'}`}
            style={{ aspectRatio: '5/8' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
            {restaurant.menuImageUrl && (
              <img src={restaurant.menuImageUrl} className="h-full w-full object-cover" />
            )}
            <span className="absolute bottom-4 left-4 text-[24px] font-bold text-white">
              {restaurant.representMenu}
            </span>
          </div>
          <div
            className={`relative ${!restaurant.pairingImageUrl && 'bg-gray-500'}`}
            style={{ aspectRatio: '5/8' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
            {restaurant.pairingImageUrl && (
              <img src={restaurant.pairingImageUrl} className="h-full w-full object-cover" />
            )}
            <span className="absolute bottom-4 left-4 text-[24px] font-bold text-white">
              {restaurant.pairingAlcohol}
            </span>
          </div>
        </div>
        <img
          src={link}
          className="absolute left-1/2 top-1/2 w-[55px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="mb-[18px] ml-4 mr-4 mt-6 text-[17px] text-[var(--gray-7)]">
        {restaurant.pairingDescription}
      </div>
    </div>
  );
};

export default PairingInfo;
