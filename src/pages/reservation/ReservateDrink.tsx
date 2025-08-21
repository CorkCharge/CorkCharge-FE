import { useEffect, useState } from 'react';

import Header from '@/shared/components/common/Header';

import logo from '@/shared/assets/images/logo.svg';
import { SearchInput } from '@/shared/components/common/Input';

function ReservateDrink() {
  const [searchq, setSearchq] = useState('');

  useEffect(() => {}, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      gotoDailyshot();
    }
  };

  const gotoDailyshot = () => {
    if (!searchq) return;
    window.open(`https://dailyshot.co/m/search/result?q=${searchq}`, '_blank');
  };

  return (
    <div className="px-4">
      <Header title="주류예약" />
      <div className="mt-5 flex flex-col items-center gap-8">
        <img src={logo} className="h-[135px] w-[30%]" />
        <SearchInput
          className="w-full text-sm"
          placeholder="찾고 있는 그 상품, 바로 검색해보세요!"
          value={searchq}
          onChange={(e) => setSearchq(e.target.value)}
          onKeyDown={handleKeyDown}
          onSearch={gotoDailyshot}
        />
      </div>
    </div>
  );
}

export default ReservateDrink;
