import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import X from '../doit/assets/x.svg';
import SearchLogo from '../doit/assets/logo_search.svg';
import TextArea from '../doit/assets/textArea.svg';
import Glasses from '../doit/assets/glasses.svg';
import StoreItem from '../../shared/components/storeItem/StoreItem ';
import NextButton from '../../shared/components/nextButton/NextButton';
import { searchRestaurants, type Restaurant } from '@/shared/apis/restaurant/searchRestaurants';

const SearchStore = () => {
  const navigate = useNavigate();

  // 검색어와 API 결과 저장을 위한 상태 추가
  const [searchQuery, setSearchQuery] = useState('');
  const [stores, setStores] = useState<Restaurant[]>([]); // API 검색 결과 상태
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 검색 실행 함수를 추가
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    try {
      const results = await searchRestaurants(searchQuery);
      setStores(Array.isArray(results) ? results : []);
      setSelectedIndex(null); // 새로운 검색 후 선택 초기화
    } catch (error) {
      console.error('레스토랑 검색에 실패했습니다:', error);
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  // 4. Enter 키로 검색을 실행하는 핸들러를 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleItemClick = (index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  //다음 페이지로 restaurantId를 포함하여 이동하도록 수정
  const handleNextClick = () => {
    if (selectedIndex != null) {
      const selectedStore = stores[selectedIndex];
      navigate(`/add/storecheck/${selectedStore.restaurantId}`, {
        state: {
          restaurantId: selectedStore.restaurantId,
          storeName: selectedStore.name,
          address: selectedStore.address,
        },
      });
    }
  };

  return (
    <div className="relative flex h-screen flex-col items-center">
      {/* 헤더1 */}
      <div className="mt-[7vh] flex h-[48px] w-full flex-row place-content-between items-center">
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="ml-[3vh] h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={handleBackClick}
        />
        <p className="text-[16px] font-[700]">추가하기</p>
        <img src={X} alt="x" className="mr-[12px] h-[17px] w-[17px]" />
      </div>
      {/* 검색 영역 */}
      <div className="flex h-[40px] w-full flex-row items-center justify-center gap-[19.67px]">
        <img src={SearchLogo} alt="로고" className="ml-[27.16px] h-[28.576px] w-[17.3px]" />
        <div className="relative flex flex-row items-center">
          <img src={TextArea} alt="입력창" className="h-[40px] w-[313px]" />
          {/* 입력창 */}
          <input
            type="text"
            placeholder="해주세요 매장 찾기"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute left-[36px] top-0 z-10 h-[40px] w-[220px] bg-transparent text-[14px] text-[#999] focus:outline-none"
          />
          <img
            src={Glasses}
            onClick={handleSearch}
            alt="돋보기"
            className="absolute right-[34.13px] h-[18px] w-[18px]"
          />
        </div>
      </div>
      <div className="mt-[16px] flex h-[608px] w-full flex-grow flex-col items-center gap-[16px] overflow-y-auto pb-[180px]">
        {stores.map((store, i) => (
          <StoreItem
            key={store.restaurantId}
            isChecked={selectedIndex === i}
            onClick={() => handleItemClick(i)}
            storeName={store.name}
            address={store.address}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-1/2 z-50 h-[168px] w-[393px] -translate-x-1/2 bg-gradient-to-b from-[rgba(255,255,255,0)] via-white to-white" />
      {selectedIndex !== null && <NextButton onClick={handleNextClick} />}
    </div>
  );
};

export default SearchStore;
