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
  const { storeName, address, restaurantId } = location.state || {
    // restaurantId 추가하기.
    storeName: '매장명 없음',
    address: '주소 없음',
    restaurantId: 0,
  };

  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [otherOptionText, setOtherOptionText] = useState('');

  const handleSelect = (key: string) => {
    setSelected((prev) => (prev === key ? null : key));
    console.log(key);
  };

  const [selectedOptions, setSelectedOptions] = useState({
    ICE_PROVIDED: false,
    GLASS_PROVIDED: false,
    ONE_BOTTLE_FREE: false,
    TWO_BOTTLE_FREE: false,
    ETC: false,
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

  const [multipleOptions, setMultipleOptions] = useState([{ liquorType: '', price: '' }]);
  const handleAddMultiple = () => {
    setMultipleOptions((prev) => [...prev, { liquorType: '', price: '' }]);
  };

  // 2. 다중 콜키지 입력값 변경 핸들러 추가
  const handleMultipleChange = (index: number, field: 'liquorType' | 'price', value: string) => {
    const newOptions = [...multipleOptions];
    newOptions[index][field] = value;
    setMultipleOptions(newOptions);
  };

  const handleClearInput = (index: number, field: 'liquorType' | 'price') => {
    const newOptions = [...multipleOptions];
    newOptions[index][field] = ''; // 해당 필드만 초기화
    setMultipleOptions(newOptions);
  };

  const handleRegister = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleXClick = () => {
    navigate('/home');
  };

  return (
    <main
      className="relative flex h-screen w-full flex-col items-stretch"
      style={{ height: 'calc(100vh - 60px)' }}
    >
      {/* 헤더1 */}
      <div className="mt-[7vh] flex h-[48px] w-full flex-row place-content-between items-center">
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="ml-[3vh] h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={handleBackClick}
        />
        <p className="text-[16px] font-[700]">추가하기</p>
        <img
          src={X}
          alt="x"
          className="mr-[12px] h-[17px] w-[17px] cursor-pointer"
          onClick={handleXClick}
        />
      </div>
      {/*가게정보*/}
      <div className="mt-[8px] flex w-full flex-col gap-[8px]">
        <div className={`ml-[32px] text-[30px] font-[700]`}>{storeName}</div>
        <div className={`ml-[32px] text-[14px] font-[500] text-[#35353F]`}>{address}</div>
      </div>
      {/*구분선*/}
      <div className="mt-[8px] h-[1px] w-[91%] bg-[#DBDDE1]"></div>
      <div className="absolute top-[20px] mt-[22.6vh] h-[66vh] w-full flex-1 overflow-y-auto">
        {/*기본정보 및 버튼*/}
        <div className="mt-[22px] flex w-full flex-row gap-[20px]">
          <div className="ml-[32px] text-[16px] font-[700]">기본정보</div>
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[8px]">
            <button
              onClick={() => handleSelect('FREE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'FREE' ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              콜키지 프리
            </button>
            <button
              onClick={() => handleSelect('PER_BOTTLE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'PER_BOTTLE'
                  ? 'bg-[#90212A] text-white'
                  : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              병당 콜키지
            </button>
            <button
              onClick={() => handleSelect('PER_PERSON')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'PER_PERSON'
                  ? 'bg-[#90212A] text-white'
                  : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              인당 콜키지
            </button>
            <button
              onClick={() => handleSelect('PER_TABLE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'PER_TABLE' ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              테이블 콜키지
            </button>
            <button
              onClick={() => handleSelect('MULTIPLE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'MULTIPLE' ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              다중 콜키지
            </button>
          </div>
        </div>
        {/* 다중 콜키지 클릭 - 주종,비용, +다중콜키지 추가 묶음 div */}
        {selected === 'MULTIPLE' && (
          <div className="mt-[32px] flex w-full flex-col gap-[8px]">
            {multipleOptions.map((option, index) => (
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
                      value={option.liquorType}
                      onChange={(e) => handleMultipleChange(index, 'liquorType', e.target.value)}
                      className="top-50 absolute left-[36px] z-10 h-[24px] w-[188px] bg-transparent text-[14px] text-[#35353F] focus:outline-none"
                    />
                    <img
                      src={x}
                      alt="x"
                      onClick={() => handleClearInput(index, 'liquorType')}
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
                      value={option.price}
                      onChange={(e) => handleMultipleChange(index, 'price', e.target.value)}
                      className="top-50 absolute left-[36px] z-10 h-[24px] w-[188px] bg-transparent text-[14px] text-[#35353F] focus:outline-none"
                    />
                    <img
                      src={x}
                      alt="x"
                      className="absolute right-[26.81px] h-[11.3px] w-[9.18px]"
                      onClick={() => handleClearInput(index, 'price')}
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
        {['PER_BOTTLE', 'PER_PERSON', 'PER_TABLE'].includes(selected!) && (
          <div className="relative mt-[16px] flex flex-row items-center justify-center">
            <p className="absolute left-[15%]">
              {selected === 'PER_BOTTLE'
                ? '병당'
                : selected === 'PER_PERSON'
                  ? '인당'
                  : selected === 'PER_TABLE'
                    ? '테이블당'
                    : ''}
            </p>
            <img src={TextArea} alt="입력창" className="h-[47px] w-[85.7%]" />
            {/* 입력창 */}
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
        <div className="mb-[136px] mt-[22px] flex w-full flex-row gap-[20px]">
          <div className="ml-[32px] text-[16px] font-[700]">세부 옵션</div>
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[8px]">
            <button
              onClick={() => toggleOption('ICE_PROVIDED')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.ICE_PROVIDED
                  ? 'bg-[#90212A] text-white'
                  : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              얼음 제공
            </button>
            <button
              onClick={() => toggleOption('GLASS_PROVIDED')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.GLASS_PROVIDED
                  ? 'bg-[#90212A] text-white'
                  : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              잔 제공
            </button>
            <button
              onClick={() => toggleOption('ONE_BOTTLE_FREE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.ONE_BOTTLE_FREE
                  ? 'bg-[#90212A] text-white'
                  : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              한병 무료
            </button>
            <button
              onClick={() => toggleOption('TWO_BOTTLE_FREE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.TWO_BOTTLE_FREE
                  ? 'bg-[#90212A] text-white'
                  : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              두병 무료
            </button>
            <button
              onClick={() => toggleOption('ETC')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.ETC ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'
              }`}
            >
              여러 기타
            </button>
          </div>
        </div>
        {/*여러 기타 클릭*/}
        {selectedOptions.ETC && (
          <div className="relative mt-[16px] flex flex-row items-center justify-center">
            <img src={TextArea} alt="입력창" className="h-[47px] w-[85.7%]" />
            {/* 입력창 */}
            <input
              type="text"
              placeholder="기타사항을 입력해주세요"
              value={otherOptionText}
              onChange={(e) => setOtherOptionText(e.target.value)}
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
      {isModalOpen && (
        <InfoModal
          storeName={storeName}
          restaurantId={restaurantId}
          onClose={handleCloseModal}
          corkageInfo={{
            selectedType: selected,
            corkagePrice: Number(price) || 0,
            multiCorkages: multipleOptions.map((opt) => ({
              liquorType: opt.liquorType,
              price: Number(opt.price) || 0,
            })),
            optionTypes: selectedOptions,
            etcContent: otherOptionText,
          }}
        />
      )}
    </main>
  );
};

export default AddOption;
