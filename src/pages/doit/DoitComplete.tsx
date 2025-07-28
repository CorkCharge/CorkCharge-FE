import { useNavigate } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import Bg from './assets/bg.svg';
import Logo from './assets/logo_search.svg';
import RightArrow from '../../shared/assets/right_arrow.svg';
const DoitComplete = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex h-screen flex-col items-center">
      {/* 헤더2 */}
      <div className="mb-[121.43px] mt-[7vh] flex h-[48px] w-full flex-row items-center justify-center">
        <img
          src={Bg}
          alt="배경"
          className="absolute left-0 top-0 z-[-1] h-full w-full object-cover"
        />
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="absolute left-[3vh] h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={handleBackClick}
        />
        <p className="text-[16px] font-[700]">해주세요</p>
      </div>
      <img src={Logo} alt="로고" className="mb-[34.68px] h-[172.887px] w-[104.673px]" />
      <div className="mb-[75px] flex flex-col items-center text-[20px] font-[700] text-white">
        <div>해주세요 서비스의</div>
        <div>접수가 완료되었습니다.</div>
      </div>
      <button className="m-auto flex h-[48px] w-[171.6px] cursor-pointer items-center justify-center gap-[10px] rounded-[12px] bg-white/50">
        <div className="text-[17px] font-[600]">홈으로 돌아가기</div>
        <img src={RightArrow} alt="오른쪽 화살표" className="mt-[3px] h-[16px] w-[9px]" />
      </button>
    </div>
  );
};

export default DoitComplete;
