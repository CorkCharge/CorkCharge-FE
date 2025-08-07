import { useNavigate } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import X from '../doit/assets/x.svg';
import StoreItem from '@/shared/components/filterStore/StoreItem ';

const FilterResult = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <main className="relative flex h-screen flex-col items-center">
      {/* 헤더1 */}
      <div className="mt-[7vh] flex h-[48px] w-full flex-row place-content-between items-center">
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="ml-[3vh] h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={handleBackClick}
        />
        <p className="text-[16px] font-[700]">지역필터링 결과조회</p>
        <img src={X} alt="x" className="mr-[12px] h-[17px] w-[17px]" />
      </div>
      <div className="mt-[16px] flex h-[608px] w-full flex-grow flex-col items-center gap-[16px] overflow-y-auto pb-[180px]">
        <StoreItem onClick={() => console.log('식당 클릭!')} storeName="밥버거" address="우리집" />
        <StoreItem onClick={() => console.log('식당 클릭!')} storeName="밥버거" address="우리집" />
        <StoreItem onClick={() => console.log('식당 클릭!')} storeName="밥버거" address="우리집" />
      </div>
    </main>
  );
};

export default FilterResult;
