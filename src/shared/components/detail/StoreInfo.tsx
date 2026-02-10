import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';

const StoreInfo = ({ restaurant }: { restaurant: RestaurantInfo }) => {
  return (
    <div>
      <div className="px-4">
        <div className="border-b-2 pb-1 pt-4 text-[16px] font-bold">가게 정보</div>
        <div className="flex border border-x-0 pb-2 pt-2">
          <div className="w-[20%] text-[16px] font-bold">가게명</div>
          <div>{restaurant.restaurantName}</div>
        </div>
        <div className="flex border border-x-0 pb-2 pt-2">
          <div className="w-[20%] text-[16px] font-bold">전화번호</div>
          <div>{restaurant.phone}</div>
        </div>
        <div className="flex border border-x-0 pb-2 pt-2">
          <div className="w-[20%] text-[16px] font-bold">주소</div>
          <div>{restaurant.address}</div>
        </div>
        <div className="flex border border-x-0 pb-2 pt-2">
          <div className="w-[20%] shrink-0 text-[16px] font-bold">영업시간</div>
          {restaurant.openingHours ? (
            <div>
              {restaurant.openingHours.split(',').map((h, idx) => (
                <p key={idx}>{h}</p>
              ))}
            </div>
          ) : (
            <p>운영시간 정보 없음</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default StoreInfo;
