import { useNavigate } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import X from './assets/x.svg';
import RightArrow from '../../shared/assets/right_arrow.svg';

const NotRegistered = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleMenuClick = () => {
    navigate('/doit/request');
  };

  return (
    <div className="relative flex h-screen flex-col items-center">
      {/*헤더*/}
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

      {/*가게정보*/}
      <div className="mb-[74px] ml-[20px] mt-[112px] flex w-full flex-col gap-[10px]">
        <div className={`ml-[16px] text-[20px] font-[700] text-black`}>깍둑 - 경희대점</div>
        <div className={`ml-[16px] text-[14px] font-[500] text-[#35353F]`}>
          서울 광진구 아차산로 24 2층
        </div>
      </div>
      {/* 여기먼저 해주세요 */}
      <div
        className="mb-[16px] flex min-h-[72px] w-[361px] cursor-pointer flex-row items-center gap-[190px] rounded-[16px] bg-[#F3F3F6]"
        onClick={handleMenuClick}
      >
        <div className="ml-[17px] text-[16px] font-[500] text-[#35353F]">여기 먼저 해주세요</div>
        <img src={RightArrow} alt="오른쪽 화살표" className="h-[20.344px] w-[11.461px]" />
      </div>
      {/* 여기는 꼭 해주세요 */}
      <div
        onClick={handleMenuClick}
        className="flex min-h-[72px] w-[361px] cursor-pointer flex-row items-center gap-[190px] rounded-[16px] bg-[#F3F3F6]"
      >
        <div className="ml-[17px] text-[16px] font-[500] text-[#35353F]">여기는 꼭 해주세요</div>
        <img src={RightArrow} alt="오른쪽 화살표" className="h-[20.344px] w-[11.461px]" />
      </div>
    </div>
  );
};

export default NotRegistered;
