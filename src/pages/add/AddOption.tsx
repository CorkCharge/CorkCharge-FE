import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import X from '../doit/assets/x.svg';
import TextArea from '../../shared/assets/Input.svg';
import TextArea2 from '../../shared/assets/Input2.svg';
import x from './assets/x.svg';
import InfoModal from '@/shared/components/addModal/InfoModal';
const AddOption = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeName, address } = location.state || {
    storeName: '매장명 없음',
    address: '주소 없음',
  };

  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (key: string) => {
    setSelected((prev) => (prev === key ? null : key));
    console.log(key);
  };

  const [selectedOptions, setSelectedOptions] = useState({
    ice: false,
    glass: false,
    freeBottle: false,
    wineGlass: false,
    others: false,
  });

  const toggleOption = (key: keyof typeof selectedOptions) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    console.log(key);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const [multipleOptions, setMultipleOptions] = useState([{ type: '', cost: '' }]);
  const handleAddMultiple = () => {
    setMultipleOptions((prev) => [...prev, { type: '', cost: '' }]);
  };

  const handleRegister = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="relative flex h-screen w-full flex-col items-stretch">
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
      <div className="mt-[8px] h-[1px] w-[91%] bg-[#DBDDE1]"></div>
      <div className="absolute mt-[22.6vh] h-[66vh] w-full flex-1 overflow-y-auto">
        {/*기본정보 및 버튼*/}
        <div className="mt-[22px] flex w-full flex-row gap-[20px]">
          <div className="ml-[32px] text-[16px] font-[700]">기본정보</div>
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[8px]">
            <button
              onClick={() => handleSelect('free')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'free' ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              콜키지 프리
            </button>
            <button
              onClick={() => handleSelect('byBottle')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'byBottle' ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              병당 콜키지
            </button>
            <button
              onClick={() => handleSelect('byPerson')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'byPerson' ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              인당 콜키지
            </button>
            <button
              onClick={() => handleSelect('byTable')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'byTable' ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              테이블 콜키지
            </button>
            <button
              onClick={() => handleSelect('multiple')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'multiple' ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              다중 콜키지
            </button>
          </div>
        </div>
        {/* 다중 콜키지 클릭 - 주종,비용, +다중콜키지 추가 묶음 div */}
        {selected === 'multiple' && (
          <div className="mt-[32px] flex w-full flex-col gap-[8px]">
            {multipleOptions.map((_, index) => (
              <div key={index}>
                {/* 주종, 입력창 묶음 div */}
                <div className="mb-[10px] flex w-full flex-row gap-[20px]">
                  <div className="ml-[32px] text-[16px] font-[700]">주종</div>
                  <div className="relative flex flex-row items-center">
                    <img src={TextArea2} alt="입력창" className="h-[47px] w-[262px]" />
                    {/* 입력창 */}
                    <input
                      type="text"
                      placeholder="주종을 입력하세요"
                      className="top-50 absolute left-[36px] z-10 h-[24px] w-[188px] bg-transparent text-[14px] text-[#35353F] focus:outline-none"
                    />
                    <img
                      src={x}
                      alt="x"
                      className="absolute right-[26.81px] h-[11.3px] w-[9.18px]"
                    />
                  </div>
                </div>
                {/* 비용, 입력창 묶음 div */}
                <div className="flex w-full flex-row gap-[20px]">
                  <div className="ml-[32px] text-[16px] font-[700]">비용</div>
                  <div className="relative flex flex-row items-center">
                    <img src={TextArea2} alt="입력창" className="h-[47px] w-[262px]" />
                    {/* 입력창 */}
                    <input
                      type="text"
                      placeholder="비용을 입력하세요"
                      className="top-50 absolute left-[36px] z-10 h-[24px] w-[188px] bg-transparent text-[14px] text-[#35353F] focus:outline-none"
                    />
                    <img
                      src={x}
                      alt="x"
                      className="absolute right-[26.81px] h-[11.3px] w-[9.18px]"
                    />
                    <span className="absolute right-[25.2%] z-10 text-[16px] font-[500] text-[#35353F]">
                      원
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* +다중 콜키지 추가 버튼 : 주종, 비용 입력창 묶음 div가 한쌍 씩 추가되야함.*/}
            <div
              onClick={handleAddMultiple}
              className="ml-[61%] min-w-[130px] cursor-pointer text-[16px] font-[500] text-[#9FA2AA]"
            >
              + 다중 콜키지 추가
            </div>
          </div>
        )}
        {/* 병당, 인당, 테이블 콜키지 클릭 */}
        {['byBottle', 'byPerson', 'byTable'].includes(selected!) && (
          <div className="relative mt-[16px] flex flex-row items-center justify-center">
            <p className="absolute left-[15%]">
              {selected === 'byBottle'
                ? '병당'
                : selected === 'byPerson'
                  ? '인당'
                  : selected === 'byTable'
                    ? '테이블당'
                    : ''}
            </p>
            <img src={TextArea} alt="입력창" className="h-[47px] w-[85.7%]" />
            {/* 입력창 */}
            <input
              type="text"
              className="top-50 absolute left-[32.2%] z-10 h-[24px] w-[220px] bg-transparent text-[14px] text-[#35353F] focus:outline-none"
            />
            <img src={x} alt="x" className="absolute right-[14.2%] h-[11.3px] w-[9.18px]" />
            {/* "원" 표시 */}
            <span className="absolute right-[25.2%] z-10 text-[16px] font-[500] text-[#35353F]">
              원
            </span>
          </div>
        )}
        {/*구분선*/}
        <div className="mt-[30px] h-[1px] w-[91%] bg-[#DBDDE1]"></div>
        {/*세부옵션 및 버튼 */}
        <div className="mt-[22px] flex w-full flex-row gap-[20px]">
          <div className="ml-[32px] text-[16px] font-[700]">세부 옵션</div>
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[8px]">
            <button
              onClick={() => toggleOption('ice')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.ice ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              얼음 제공
            </button>
            <button
              onClick={() => toggleOption('glass')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.glass ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              잔 제공
            </button>
            <button
              onClick={() => toggleOption('freeBottle')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.freeBottle
                  ? 'bg-[#90212A] text-white'
                  : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              한 병 무료
            </button>
            <button
              onClick={() => toggleOption('wineGlass')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.wineGlass
                  ? 'bg-[#90212A] text-white'
                  : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              와인잔 제공
            </button>
            <button
              onClick={() => toggleOption('others')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.others ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              여러 기타
            </button>
          </div>
        </div>
        {/*여러 기타 클릭*/}
        {selectedOptions.others && (
          <div className="relative mt-[16px] flex flex-row items-center justify-center">
            <img src={TextArea} alt="입력창" className="h-[47px] w-[85.7%]" />
            {/* 입력창 */}
            <input
              type="text"
              placeholder="기타사항을 입력해주세요"
              className="top-50 absolute left-[12.2%] z-10 h-[24px] w-[220px] bg-transparent text-[14px] text-[#35353F] focus:outline-none"
            />
            <img src={x} alt="x" className="absolute right-[14.2%] h-[11.3px] w-[9.18px]" />
          </div>
        )}
      </div>
      <div className="absolute bottom-[5.6vh] flex w-full flex-row justify-center gap-[12px]">
        <button
          className="h-[48px] w-[38%] cursor-pointer items-center rounded-[12px] bg-[#F3F3F6] text-[16px] font-[700] text-black"
          onClick={handleBackClick}
        >
          뒤로가기
        </button>
        <button
          onClick={handleRegister}
          className="h-[48px] w-[38%] cursor-pointer items-center rounded-[12px] bg-[#90212A] text-[16px] font-[700] text-white"
        >
          등록하기
        </button>
      </div>
      {isModalOpen && <InfoModal storeName={storeName} onClose={handleCloseModal} />}
    </main>
  );
};

export default AddOption;
