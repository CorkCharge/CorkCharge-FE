import { useNavigate } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import X from './x.svg';
import SearchLogo from './logo_search.svg';
import TextArea from './textArea.svg';
//import Glasses from './glasses.svg';

const Search = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center">
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
      <div className="flex h-[40px] w-[361px] flex-row items-center bg-yellow-200">
        <img src={SearchLogo} alt="로고" className="h-[28.576px] w-[17.3px]" />
        <div className="inline">
          <img src={TextArea} alt="입력창" className="h-[40px] w-[313px]" />
        </div>
      </div>
    </div>
  );
};

export default Search;
