import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import X from '../doit/assets/x.svg';
import TextArea2 from '../../shared/assets/Input2.svg';
import x from './assets/x.svg';
import InfoModal from '@/shared/components/addModal/InfoModal';
import { ImageInput } from '@/shared/components/common/Input';
const AddOption = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurantName, address, restaurantId } = location.state.restaurant;

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
    navigate('/my');
  };

  return (
    <main className="relative flex w-full flex-col items-stretch px-4">
      {/* 헤더 */}
      <div className="flex h-[48px] w-full place-content-between items-center">
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={handleBackClick}
        />
        <p className="text-[16px] font-[700]">추가하기</p>
        <img src={X} alt="x" className="h-[17px] w-[17px] cursor-pointer" onClick={handleXClick} />
      </div>

      {/*가게정보*/}
      <div className="mt-[8px] flex w-full flex-col gap-[8px]">
        <div className={`ml-4 text-[30px] font-[700]`}>{restaurantName}</div>
        <div className={`ml-4 text-[14px] font-[500] text-[var(--gray-8)]`}>{address}</div>
      </div>

      {/*구분선*/}
      <div className="mt-4 h-[1px] bg-[var(--gray-3)]" />

      <div className="mb-[100px] w-full flex-1 overflow-y-auto">
        {/*기본정보 및 버튼*/}
        <div className="mt-[22px] flex w-full gap-[20px]">
          <div className="ml-4 text-nowrap text-[16px] font-[700]">기본정보</div>
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[8px]">
            <button
              onClick={() => handleSelect('FREE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'FREE'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--gray-1)] text-[var(--gray-8)]'
              }`}
            >
              콜키지 프리
            </button>
            <button
              onClick={() => handleSelect('PER_BOTTLE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'PER_BOTTLE'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--gray-1)] text-[var(--gray-8)]'
              }`}
            >
              병당 콜키지
            </button>
            <button
              onClick={() => handleSelect('PER_PERSON')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'PER_PERSON'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--gray-1)] text-[var(--gray-8)]'
              }`}
            >
              인당 콜키지
            </button>
            <button
              onClick={() => handleSelect('PER_TABLE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'PER_TABLE'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--gray-1)] text-[var(--gray-8)]'
              }`}
            >
              테이블 콜키지
            </button>
            <button
              onClick={() => handleSelect('MULTIPLE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selected === 'MULTIPLE'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--gray-1)] text-[var(--gray-8)]'
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
                <div className="mb-[10px] flex w-full gap-[20px]">
                  <div className="ml-[32px] text-[16px] font-[700]">주종</div>
                  <div className="relative flex items-center">
                    <img src={TextArea2} alt="입력창" className="h-[47px] w-[262px]" />
                    {/* 입력창 */}
                    <input
                      type="text"
                      placeholder="주종을 입력하세요"
                      value={option.liquorType}
                      onChange={(e) => handleMultipleChange(index, 'liquorType', e.target.value)}
                      className="top-50 absolute left-[36px] z-10 h-[24px] w-[188px] bg-transparent text-[14px] text-[var(--gray-8)] focus:outline-none"
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
                <div className="flex w-full gap-[20px]">
                  <div className="ml-[32px] text-[16px] font-[700]">비용</div>
                  <div className="relative flex items-center">
                    <img src={TextArea2} alt="입력창" className="h-[47px] w-[262px]" />
                    {/* 입력창 */}
                    <input
                      type="number"
                      placeholder="비용을 입력하세요"
                      value={option.price}
                      onChange={(e) => handleMultipleChange(index, 'price', e.target.value)}
                      className="top-50 absolute left-[36px] z-10 h-[24px] w-[138px] bg-transparent text-[14px] text-[var(--gray-8)] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <img
                      src={x}
                      alt="x"
                      className="absolute right-[26.81px] h-[11.3px] w-[9.18px]"
                      onClick={() => handleClearInput(index, 'price')}
                    />
                    <span className="absolute right-[25.2%] z-10 text-[16px] font-[500] text-[var(--gray-8)]">
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
          <div className="relative mt-4 flex h-11 items-center rounded-ee-full rounded-ss-full bg-[var(--gray-1)]">
            <input
              type="number"
              placeholder="비용을 입력해주세요"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="z-10 h-[24px] w-[220px] bg-transparent pl-8 text-[var(--gray-8)] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <img
              src={x}
              alt="x"
              className="absolute right-[14.2%] h-[11.3px] w-[9.18px] cursor-pointer"
              onClick={() => setPrice('')}
            />
            <span className="absolute right-[25.2%] z-10 text-[16px] font-[500] text-[var(--gray-8)]">
              원
            </span>
          </div>
        )}
        {/* {['PER_BOTTLE', 'PER_PERSON', 'PER_TABLE'].includes(selected!) && (
          <div className="relative mt-[16px] flex items-center justify-center">
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
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="top-50 absolute left-[32.2%] z-10 h-[24px] w-[220px] bg-transparent text-[14px] text-[var(--gray-8)] focus:outline-none"
            />
            <img src={x} alt="x" className="absolute right-[14.2%] h-[11.3px] w-[9.18px]" />
            <span className="absolute right-[25.2%] z-10 text-[16px] font-[500] text-[var(--gray-8)]">
              원
            </span>
          </div>
        )} */}

        {/*구분선*/}
        <div className="mt-8 h-[1px] bg-[var(--gray-3)]" />
        {/*세부옵션 및 버튼 */}
        <div className="mt-[22px] flex w-full gap-[20px]">
          <div className="ml-4 text-[16px] font-[700]">세부 옵션</div>
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[8px]">
            <button
              onClick={() => toggleOption('ICE_PROVIDED')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.ICE_PROVIDED
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--gray-1)] text-[var(--gray-8)]'
              }`}
            >
              얼음 제공
            </button>
            <button
              onClick={() => toggleOption('GLASS_PROVIDED')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.GLASS_PROVIDED
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--gray-1)] text-[var(--gray-8)]'
              }`}
            >
              잔 제공
            </button>
            <button
              onClick={() => toggleOption('ONE_BOTTLE_FREE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.ONE_BOTTLE_FREE
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--gray-1)] text-[var(--gray-8)]'
              }`}
            >
              한병 무료
            </button>
            <button
              onClick={() => toggleOption('TWO_BOTTLE_FREE')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.TWO_BOTTLE_FREE
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--gray-1)] text-[var(--gray-8)]'
              }`}
            >
              두병 무료
            </button>
            <button
              onClick={() => toggleOption('ETC')}
              className={`h-[32px] w-[111px] rounded-[20px] text-[14px] font-[500] ${
                selectedOptions.ETC
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--gray-1)] text-[var(--gray-8)]'
              }`}
            >
              여러 기타
            </button>
          </div>
        </div>

        {/*여러 기타 클릭*/}
        {selectedOptions.ETC && (
          <ImageInput
            placeholder="기타 사항을 입력해주세요"
            className="mt-4 w-full"
            imgClassName="w-3 h-8 cursor-pointer"
            imgSrc={X}
            value={otherOptionText}
            onChange={(e) => setOtherOptionText(e.target.value)}
            onImgClick={() => setOtherOptionText('')}
          />
        )}
      </div>

      {/* 등록하기 버튼 */}
      <div
        className="fixed bottom-8 left-1/2 flex w-full -translate-x-1/2 justify-center gap-[12px]"
        style={{ maxWidth: 'calc(var(--app-width) * 0.8)' }}
      >
        <button
          onClick={handleRegister}
          className="h-[48px] flex-1 cursor-pointer items-center rounded-[12px] bg-[var(--primary)] text-[16px] font-[700] text-white disabled:bg-[var(--gray-1)] disabled:text-[var(--gray-8)]"
          disabled={!selected || !Object.values(selectedOptions).includes(true) || price === ''}
        >
          등록하기
        </button>
      </div>
      {isModalOpen && (
        <InfoModal
          storeName={restaurantName}
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
