import { useNavigate, useLocation } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import X from '../doit/assets/x.svg';
import TextArea from '../doit/assets/textArea.svg';
import x from './assets/x.svg';
const AddOption = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeName, address } = location.state || {
    storeName: '매장명 없음',
    address: '주소 없음',
  };
  const handleBackClick = () => {
    navigate(-1);
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
      {/*가게정보*/}
      <div className="mt-[8px] flex w-full flex-col gap-[8px]">
        <div className={`ml-[32px] text-[30px] font-[700]`}>{storeName}</div>
        <div className={`ml-[32px] text-[14px] font-[500] text-[#35353F]`}>{address}</div>
      </div>
      {/*구분선*/}
      <div className="mt-[8px] h-[1px] w-[91vw] bg-[#DBDDE1]"></div>
      <div className="mt-[22px] flex w-full flex-row gap-[20px]">
        <div className="ml-[32px] text-[16px] font-[700]">기본정보</div>
        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[8px]">
          <button className="h-[32px] w-[111px] rounded-[20px] bg-[#F3F3F6] text-[14px] font-[500]">
            콜키지 프리
          </button>
          <button className="h-[32px] w-[111px] rounded-[20px] bg-[#F3F3F6] text-[14px] font-[500]">
            병당 콜키지
          </button>
          <button className="h-[32px] w-[111px] rounded-[20px] bg-[#F3F3F6] text-[14px] font-[500]">
            인당 콜키지
          </button>
          <button className="h-[32px] w-[111px] rounded-[20px] bg-[#F3F3F6] text-[14px] font-[500]">
            테이블 콜키지
          </button>
          <button className="h-[32px] w-[111px] rounded-[20px] bg-[#F3F3F6] text-[14px] font-[500]">
            다중 콜키지
          </button>
        </div>
      </div>
      {/* 주종,비용, +다중콜키지 추가 묶음 div */}
      <div className="flex w-full flex-col gap-[8px]">
        {/* 주종, 입력창 묶음 div */}
        <div className="flex w-full flex-row gap-[20px]">
          <div className="ml-[32px] text-[16px] font-[700]">주종</div>
          <div className="relative flex flex-row items-center">
            <img src={TextArea} alt="입력창" className="h-[47px] w-[262px]" />
            {/* 입력창 */}
            <input
              type="text"
              placeholder="주종을 입력하세요"
              className="top-50 absolute left-[36px] z-10 h-[24px] w-[188px] bg-transparent text-[14px] text-[#35353F] focus:outline-none"
            />
            <img src={x} alt="x" className="absolute right-[26.81px] h-[11.3px] w-[9.18px]" />
          </div>
        </div>
        {/* 비용, 입력창 묶음 div */}
        <div className="flex w-full flex-row gap-[20px]">
          <div className="ml-[32px] text-[16px] font-[700]">비용</div>
          <div className="relative flex flex-row items-center">
            <img src={TextArea} alt="입력창" className="h-[47px] w-[262px]" />
            {/* 입력창 */}
            <input
              type="text"
              placeholder="비용을 입력하세요"
              className="top-50 absolute left-[36px] z-10 h-[24px] w-[188px] bg-transparent text-[14px] text-[#35353F] focus:outline-none"
            />
            <img src={x} alt="x" className="absolute right-[26.81px] h-[11.3px] w-[9.18px]" />
          </div>
        </div>
        {/* +다중 콜키지 추가 버튼*/}
        <div className="ml-[61vw] min-w-[130px] cursor-pointer text-[16px] font-[500] text-[#9FA2AA]">
          + 다중 콜키지 추가
        </div>
      </div>
      {/*구분선*/}
      <div className="mt-[8px] h-[1px] w-[91vw] bg-[#DBDDE1]"></div>
    </div>
  );
};

export default AddOption;
