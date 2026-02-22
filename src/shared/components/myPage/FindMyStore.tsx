import { useState, useEffect } from 'react';

import { SearchInput } from '../common/Input';
import { getMasterRestaurant } from '@/shared/apis/user/user.api';
import type { MasterStoreResponse } from '@/shared/apis/user/user.type';
import { getTodayOperatingHours } from '@/shared/utils/operatingHours';

function FindMyStore({ onNext }: { onNext: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState<MasterStoreResponse[]>([]);
  const [selectedRestId, setSelectedRestId] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  // const isFirstSearch = useRef(true);

  useEffect(() => {
    getRestaurant();
  }, []);

  const getRestaurant = async () => {
    try {
      const res = await getMasterRestaurant();
      setRestaurants(res);
      setIsComplete(true);
    } catch (e) {
      console.error('사장님 가게 가져오기 실패: ' + e);
    }
  };
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     onSearch();
  //   }
  // };

  // const onSearch = async () => {
  //   if (!searchQuery) return;
  //   if (isFirstSearch.current) isFirstSearch.current = false;

  //   try {
  //     const data = await searchRestaurants(searchQuery);
  //     setRestaurants(data);
  //   } catch (e) {
  //     console.log('식당 검색 실패 : ' + e);
  //   }
  // };

  const renderStore = () => {
    // if (restaurants.length === 0 && !isFirstSearch.current) {
    if (restaurants.length === 0 && isComplete) {
      return <p className="mt-5 text-center">가게가 존재하지 않습니다.</p>;
    }

    return restaurants.map((rest) => (
      <div
        key={rest.restaurantId}
        className={`rounded-2xl bg-[var(--gray-1)] p-4 text-sm font-medium ${selectedRestId === rest.restaurantId ? 'border border-[var(--primary)]' : 'border border-transparent'}`}
        onClick={() => setSelectedRestId(rest.restaurantId)}
      >
        <span className="text-xl font-bold">{rest.restaurantName}</span>
        <p className="mt-1 leading-6">{'주소주소주소주소'}</p>
        <p className="flex gap-3 leading-6">
          <span>영업중</span>
          <span>{getTodayOperatingHours(rest.openingHours)}</span>
        </p>
        <p className="leading-6">콜키지 {rest.corkagePrice}</p>
      </div>
    ));
  };

  return (
    <div className="px-4">
      <div className="pt-[60px]"></div>

      <div
        className="h-[6px] rounded-[4.5px]"
        style={{ boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1) inset' }}
      >
        <div className="h-full w-[1%] rounded-[4.5px] bg-[var(--primary)]"></div>
      </div>

      <p className="my-5 text-2xl font-bold text-[var(--gray-8)]">가게를 불러올게요</p>

      <SearchInput
        placeholder="매장 주소를 입력해주세요"
        className="mb-4"
        onChange={(e) => setSearchQuery(e.target.value)}
        // onKeyDown={handleKeyDown}
        value={searchQuery}
        // onSearch={onSearch}
      />

      <div className="flex flex-col gap-3 overflow-y-auto pb-[100px]">{renderStore()}</div>

      {selectedRestId !== -1 && (
        <button
          className="fixed bottom-4 left-[10%] right-[10%] mx-auto h-[48px] w-[80%] max-w-[480px] rounded-[10px] bg-[var(--primary)] font-bold text-white"
          style={{ maxWidth: 'calc(var(--app-width)* 0.8)' }}
          onClick={onNext}
        >
          다음
        </button>
      )}
    </div>
  );
}

export default FindMyStore;
