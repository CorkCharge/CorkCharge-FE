import { useState } from 'react';

import Header from '@/shared/components/common/Header';
import { DrinkTab, RestaurantTab } from '@/shared/components/myPage/ReservationTabs';

function Reservation() {
  const [isDrink, setIsDrink] = useState(false);

  return (
    <div className="px-4">
      <Header title="나의 예약" type="back" />
      <div className="-mx-4 border-b border-[var(--gray-2)]">
        <div className="mx-10 flex gap-5">
          <div
            className={`flex-1 py-2 text-center text-sm font-medium ${isDrink ? 'border-b border-[var(--gray-7)] text-[var(--gray-8)]' : 'text-[var(--gray-6)]'}`}
            onClick={() => setIsDrink(true)}
          >
            주류 예약
          </div>
          <div
            className={`flex-1 py-2 text-center text-sm font-medium ${!isDrink ? 'border-b border-[var(--gray-7)] text-[var(--gray-8)]' : 'text-[var(--gray-6)]'}`}
            onClick={() => setIsDrink(false)}
          >
            매장 예약
          </div>
        </div>
      </div>

      {/* 개당 높이 285px */}
      {isDrink ? DrinkTab() : RestaurantTab()}
    </div>
  );
}

export default Reservation;
