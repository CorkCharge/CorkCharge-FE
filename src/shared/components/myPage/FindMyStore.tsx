import { useState, useRef } from 'react';

import { SearchInput } from '../common/Input';
import apiClient from '@/shared/apis/apiClient';

interface Restaurant {
  restaurantId: number;
  name: string;
  address: string;
}

function FindMyStore({ onNext }: { onNext: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestId, setSelectedRestId] = useState(-1);

  const isFirstSearch = useRef(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const onSearch = () => {
    if (!searchQuery) return;
    if (isFirstSearch.current) isFirstSearch.current = false;

    apiClient
      .get('/restaurants/search', { params: { keyword: searchQuery } })
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const renderStore = () => {
    if (restaurants.length === 0 && !isFirstSearch.current) {
      return <p className="mt-5 text-center">조건에 맞는 식당이 없습니다.</p>;
    } else {
      return restaurants.map((rest, idx) => (
        <div
          key={idx}
          className={`rounded-2xl bg-[var(--gray-1)] p-4 text-sm font-medium ${selectedRestId === rest.restaurantId ? 'border border-[var(--primary)]' : 'border border-transparent'}`}
          onClick={() => setSelectedRestId(rest.restaurantId)}
        >
          <span className="text-xl font-bold">{rest.name}</span>
          <p className="mt-1 leading-6">{rest.address}</p>
          <p className="flex gap-3 leading-6">
            <span>영업중</span>
            <span>21:30 라스트오더</span>
          </p>
          <p className="leading-6">병당 콜키지 1병 10,000원</p>
        </div>
      ));
    }
  };

  //temp code
  const _renderStore = () =>
    [...new Array(5)].map((_, idx) => (
      <div
        key={idx}
        className={`rounded-2xl bg-[var(--gray-1)] p-4 text-sm font-medium ${selectedRestId === idx ? 'border border-[var(--primary)]' : 'border border-transparent'}`}
        onClick={() => setSelectedRestId(idx)}
      >
        <span className="text-xl font-bold">로니로티</span>
        <p className="mt-1 leading-6">서울 광진구 아차산로 225 단산화빌딩</p>
        <p className="flex gap-3 leading-6">
          <span>영업중</span>
          <span>21:30 라스트오더</span>
        </p>
        <p className="leading-6">병당 콜키지 1병 10,000원</p>
      </div>
    ));

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
        onKeyDown={handleKeyDown}
        value={searchQuery}
        onSearch={onSearch}
      />

      <div className="flex flex-col gap-3 overflow-y-auto pb-[100px]">{_renderStore()}</div>

      {selectedRestId !== -1 && (
        <button
          className="fixed bottom-4 left-[10%] right-[10%] mx-auto h-[48px] w-[80%] max-w-[480px] rounded-[10px] bg-[var(--primary)] font-bold text-white"
          onClick={onNext}
        >
          다음
        </button>
      )}
    </div>
  );
}

export default FindMyStore;
