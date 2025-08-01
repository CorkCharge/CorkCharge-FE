import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import X from '../doit/assets/x.svg';
import SearchLogo from '../doit/assets/logo_search.svg';
import TextArea from '../doit/assets/textArea.svg';
import Glasses from '../doit/assets/glasses.svg';
import StoreItem from '../../shared/components/storeItem/StoreItem ';
import NextButton from '../../shared/components/nextButton/NextButton';

const SearchStore = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const stores = [
    {
      storeName: '깍뚝 - 경희대점',
      address: '서울 광진구 아차산로 24 2층',
    },
    {
      storeName: '해장국 - 서울대입구점',
      address: '서울 관악구 신림로 123',
    },
    {
      storeName: '봉구스밥버거 - 건대후문점',
      address: '서울 관악구 신림로 123',
    },
    {
      storeName: '봉구스밥버거 - 건대후문점',
      address: '서울 관악구 신림로 123',
    },
    {
      storeName: '봉구스밥버거 - 건대후문점',
      address: '서울 관악구 신림로 123',
    },
    {
      storeName: '봉구스밥버거 - 건대후문점',
      address: '서울 관악구 신림로 123',
    },
    {
      storeName: '봉구스밥버거 - 건대후문점',
      address: '서울 관악구 신림로 123',
    },
    {
      storeName: '봉구스밥버거 - 건대후문점',
      address: '서울 관악구 신림로 123',
    },
    {
      storeName: '봉구스밥버거 - 건대후문점',
      address: '서울 관악구 신림로 123',
    },
    {
      storeName: '봉구스밥버거 - 건대후문점',
      address: '서울 관악구 신림로 123',
    },
    // ... 총 10개
  ];

  const handleNextClick = () => {
    console.log('다음버튼 클릭!');
    if (selectedIndex != null) {
      const selectedStore = stores[selectedIndex];
      navigate('/add/storecheck', {
        state: {
          storeName: selectedStore.storeName,
          address: selectedStore.address,
        },
      });
    }
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
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
            className="absolute left-[36px] top-0 z-10 h-[40px] w-[220px] bg-transparent text-[14px] text-[#999] focus:outline-none"
          />
          <img src={Glasses} alt="돋보기" className="absolute right-[34.13px] h-[18px] w-[18px]" />
        </div>
      </div>
      <div className="mt-[16px] flex h-[608px] w-full flex-grow flex-col items-center gap-[16px] overflow-y-auto pb-[180px]">
        {stores.map((store, i) => (
          <StoreItem
            key={i}
            isChecked={selectedIndex === i}
            onClick={() => handleItemClick(i)}
            storeName={store.storeName}
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
