import { useNavigate, useLocation } from 'react-router-dom';
import Back from '../../shared/assets/whiteArrow.svg';
import X from '../../shared/assets/whiteX.svg';
import Bg from '../doit/assets/request_bg.svg';
import Placeholder from '../../shared/assets/placeholder.svg';
const StoreCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeName, address } = location.state || {
    storeName: '매장명 없음',
    address: '주소 없음',
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleRegisterClick = () => {
    navigate('/add/option', {
      state: {
        storeName: storeName,
        address: address,
      },
    });
  };
  return (
    <div className="relative flex h-screen flex-col items-center">
      <img
        src={Bg}
        alt="배경"
        className="absolute left-0 top-0 z-[-1] h-full w-full object-cover"
      />
      {/*헤더*/}
      <div className="mt-[7vh] flex h-[48px] w-full flex-row place-content-between items-center">
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="ml-[3vh] h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={handleBackClick}
        />
        <p className="text-[16px] font-[700] text-white">추가하기</p>
        <img src={X} alt="x" className="mr-[12px] h-[17px] w-[17px]" />
      </div>
      <div className="mb-[26px] mt-[56px] text-[24px] font-[700] text-white">
        위 가게가 맞습니까?
      </div>
      <div
        className="flex h-[480px] w-[293px] flex-col items-center rounded-bl-[3%] rounded-br-[25%] rounded-tl-[25%] rounded-tr-[3%] bg-white/80"
        style={{
          boxShadow:
            '0px 4px 20px 0px rgba(58, 13, 16, 0.20), 0.318px 0.318px 2px 0px rgba(255, 255, 255, 0.30) inset',
        }}
      >
        <img
          src={Placeholder}
          alt="placeholder"
          className="mt-[27px] h-[201px] w-[268px] rounded-bl-[3%] rounded-br-[25%] rounded-tl-[25%] rounded-tr-[3%]"
        />
        {/*가게정보*/}
        <div className="mt-[20px] flex w-full flex-col gap-[10px]">
          <div className={`ml-[26px] text-[24px] font-[700]`}>{storeName}</div>
          <div className={`ml-[26px] text-[14px] font-[500] text-[#35353F]`}>{address}</div>
        </div>
        <div className="mt-[67px] flex flex-row gap-[6px]">
          <button
            onClick={handleRegisterClick}
            className="m-auto h-[48px] w-[123px] cursor-pointer items-center rounded-[12px] bg-[#90212A] font-[600] text-white"
          >
            맞습니다
          </button>
          <button
            className="m-auto h-[48px] w-[123px] cursor-pointer items-center rounded-[12px] bg-white/80 font-[600] text-black"
            style={{
              boxShadow:
                '0px 0px 0.5px 0px rgba(66, 71, 76, 0.32), 0px 4px 8px 0px rgba(66, 71, 76, 0.05)',
              backdropFilter: 'blur(5px)',
            }}
            onClick={handleBackClick}
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCheck;
