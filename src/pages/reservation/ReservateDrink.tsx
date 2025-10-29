import { useEffect, useState, useRef } from 'react';

import Header from '@/shared/components/common/Header';
import { SearchInput } from '@/shared/components/common/Input';
import Modal from '@/shared/components/common/Modal';

import logo from '@/shared/assets/images/logo.svg';

function ReservateDrink() {
  const searchbarRef = useRef<HTMLInputElement>(null);
  const [searchq, setSearchq] = useState('');
  const [emptyModalVisible, setEmptyModalVisible] = useState(false);

  useEffect(() => {
    if (searchbarRef.current) {
      searchbarRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      gotoDailyshot();
    }
  };

  const gotoDailyshot = () => {
    // 검색어가 없는 상태로 검색 시도
    if (!searchq) {
      setEmptyModalVisible(true);
      return;
    }

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
          ref={searchbarRef}
        />
      </div>

      {emptyModalVisible && (
        <Modal
          isOpen={emptyModalVisible}
          hasCloseButton={true}
          onClose={() => {
            setEmptyModalVisible(false);
            searchbarRef.current?.focus();
          }}
        >
          검색어를 입력하세요
        </Modal>
      )}
    </div>
  );
}

export default ReservateDrink;
