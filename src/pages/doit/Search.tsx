import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import X from './x.svg';
import SearchLogo from './logo_search.svg';
import TextArea from './textArea.svg';
import Glasses from './glasses.svg';
import StoreItem from '../../shared/components/storeItem/StoreItem ';
import NextButton from '../../shared/components/nextButton/NextButton';

const Search = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative flex h-screen flex-col items-center">
      {/* 헤더 */}
      <div className="mt-[7vh] flex h-[48px] w-full flex-row place-content-between items-center">
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="ml-[3vh] h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={handleBackClick}
        />
        <p className="text-[16px] font-[700]">해주세요</p>
        <img src={X} alt="x" className="mr-[12px] h-[17px] w-[17px]" />
      </div>
      {/* 검색 영역 */}
      <div className="flex h-[40px] w-full flex-row items-center gap-[19.67px]">
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
        {Array.from({ length: 10 }).map((_, i) => (
          <StoreItem key={i} isChecked={selectedIndex === i} onClick={() => handleItemClick(i)} />
        ))}
      </div>
      <div className="fixed bottom-0 left-1/2 z-50 h-[168px] w-[393px] -translate-x-1/2 bg-gradient-to-b from-[rgba(255,255,255,0)] via-white to-white" />
      {selectedIndex !== null && <NextButton />}
    </div>
  );
};

export default Search;
