import { useNavigate } from 'react-router-dom';
import Back from '../../shared/assets/whiteArrow.svg';
import X from '../../shared/assets/whiteX.svg';
import Bg from './assets/request_bg.svg';
const Request = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleRegisterClick = () => {
    navigate('/doit/complete');
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
        <p className="text-[16px] font-[700] text-white">해주세요</p>
        <img src={X} alt="x" className="mr-[12px] h-[17px] w-[17px]" />
      </div>
      {/*가게정보*/}
      <div className="mb-[18px] ml-[20px] mt-[16px] flex w-full flex-col gap-[10px] text-white">
        <div className={`ml-[16px] text-[30px] font-[700]`}>깍둑 - 경희대점</div>
        <div className={`ml-[16px] text-[14px] font-[500]`}>서울 광진구 아차산로 24 2층</div>
      </div>
      <div
        className="h-[528px] w-[361px] rounded-[16px] bg-white/80"
        style={{
          boxShadow:
            '0px 4px 20px 0px rgba(58, 13, 16, 0.20), 0.318px 0.318px 2px 0px rgba(255, 255, 255, 0.30) inset',
        }}
      >
        {/*어떤 메뉴를 선택했는지에 따라*/}
        <div className="mb-[10px] ml-[16px] mt-[24px] text-[20px] font-[700]">
          여기 먼저 해주세요
        </div>
        <div className="m-auto mb-[24px] flex h-[360px] w-[329px] rounded-[16px] bg-white">
          <textarea
            placeholder={'원하는 콜키지 가격이나\n옵션을 작성해주세요'}
            className="m-auto h-[312px] w-[292px] focus:outline-none"
          ></textarea>
        </div>
        <div className="flex flex-row">
          <button
            className="m-auto h-[48px] w-[156px] cursor-pointer items-center rounded-[12px] bg-white/80 font-[600] text-black"
            style={{
              boxShadow:
                '0px 0px 0.5px 0px rgba(66, 71, 76, 0.32), 0px 4px 8px 0px rgba(66, 71, 76, 0.05)',
              backdropFilter: 'blur(5px)',
            }}
          >
            취소
          </button>
          <button
            onClick={handleRegisterClick}
            className="m-auto h-[48px] w-[156px] cursor-pointer items-center rounded-[12px] bg-[#90212A] font-[600] text-white"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Request;
