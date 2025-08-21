import { useMemo } from 'react';
import Slider from 'rc-slider';

interface OptionsProps {
  range: [number, number];
  setRange: (value: [number, number]) => void;
  range2: [number, number];
  setRange2: (value: [number, number]) => void;
  range3: [number, number];
  setRange3: (value: [number, number]) => void;
  range4: [number, number];
  setRange4: (value: [number, number]) => void;
  selectedCorkageTypes: string[];
  setSelectedCorkageTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedOptionsTypes: string[];
  setSelectedOptionsTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

const Options = ({
  range,
  setRange,
  range2,
  setRange2,
  range3,
  setRange3,
  range4,
  setRange4,
  selectedCorkageTypes,
  setSelectedCorkageTypes,
  selectedOptionsTypes,
  setSelectedOptionsTypes,
}: OptionsProps) => {
  const optionTypes = ['잔제공', '얼음제공', '한병 무료', '두병무료'];
  const corkageTypes = ['콜키지프리', '병당', '테이블당', '인당', '다중'];

  const toggleCategory = (category: string) => {
    setSelectedCorkageTypes((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // 어떤 슬라이더를 활성화할지 결정 (첫 번째 슬라이더는 항상 활성)
  const enable = useMemo(() => {
    const hasSpecific =
      selectedCorkageTypes.includes('병당') ||
      selectedCorkageTypes.includes('인당') ||
      selectedCorkageTypes.includes('테이블당');

    // 프리/다중만 선택된 경우 -> 모두 비활성
    if (!hasSpecific) {
      return { bottle: false, person: false, table: false };
    }
    return {
      bottle: selectedCorkageTypes.includes('병당'),
      person: selectedCorkageTypes.includes('인당'),
      table: selectedCorkageTypes.includes('테이블당'),
    };
  }, [selectedCorkageTypes]);

  const toggleOption = (option: string) => {
    setSelectedOptionsTypes((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  // 활성/비활성에 따른 스타일 세트
  const sliderStyles = (isEnabled: boolean) => ({
    trackStyle: [{ backgroundColor: isEnabled ? '#90212A' : '#E5E5EA', height: 6 }],
    handleStyle: [
      {
        borderColor: isEnabled ? '#90212A' : '#E5E5EA',
        height: 24,
        width: 24,
        marginTop: -10,
        backgroundColor: isEnabled ? 'white' : '#F5F5F5',
        boxShadow: isEnabled ? '0 0 5px rgba(0,0,0,0.2)' : 'none',
      },
      {
        borderColor: isEnabled ? '#90212A' : '#E5E5EA',
        height: 24,
        width: 24,
        marginTop: -10,
        backgroundColor: isEnabled ? 'white' : '#F5F5F5',
        boxShadow: isEnabled ? '0 0 5px rgba(0,0,0,0.2)' : 'none',
      },
    ],
    railStyle: { backgroundColor: '#E5E5EA', height: 6 },
  });

  return (
    <>
      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="flex w-full flex-col gap-[4px] self-start">
          <div className="ml-[32px] mt-[14px] self-start text-[20px] font-[500]">콜키지 종류</div>
          <div className="ml-[32px] flex w-full flex-row gap-[8px]">
            {corkageTypes.map((category) => {
              const active = selectedCorkageTypes.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  aria-pressed={active}
                  className={`h-[32px] w-[80px] rounded-[20px] text-[14px] font-[500] ${
                    active ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#90212A]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-[8px] ml-[32px] mt-[16px] self-start text-[20px] font-[500]">
          콜키지 스코어
        </div>
        <Slider
          range
          allowCross={false}
          defaultValue={[0, 5]}
          min={0}
          max={5}
          step={1}
          value={range}
          onChange={(val) => setRange(val as [number, number])}
          {...sliderStyles(true)}
          style={{ width: '83.2%', margin: 'auto' }}
        />
        <div className="mx-auto flex w-[83.2%] flex-row justify-between">
          <span className="text-[14px] font-[500] text-[#8E8E93]">0점</span>
          <span className="text-[14px] font-[500] text-[#8E8E93]">5점</span>
        </div>
        <span className="mr-[8%] self-end text-right text-[14px] font-[700] text-[#90212A]">
          {range[0]}점 ~ {range[1]}점
        </span>
      </div>
      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="mb-[8px] ml-[32px] self-start text-[20px] font-[500]">가격</div>
      </div>
      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="mb-[8px] ml-[32px] mt-[8px] self-start text-[16px] font-[500]">
          병당 가격
        </div>
        <Slider
          range
          allowCross={false}
          defaultValue={[0, 50000]}
          min={0}
          max={50000}
          step={1000}
          value={range2}
          onChange={(val) => setRange2(val as [number, number])}
          disabled={!enable.bottle}
          {...sliderStyles(!!enable.bottle)}
          style={{ width: '83.2%', margin: 'auto' }}
        />
        <div className="mx-auto flex w-[83.2%] flex-row justify-between">
          <span className="text-[14px] font-[500] text-[#8E8E93]">0원</span>
          <span className="text-[14px] font-[500] text-[#8E8E93]">50,000원 이상</span>
        </div>
        <span
          className={`mr-[8%] self-end text-right text-[14px] font-[700] text-[#90212A] ${
            enable.bottle ? '' : 'invisible'
          }`}
          aria-hidden={!enable.bottle}
        >
          {range2[0]}원 ~ {range2[1]}원
        </span>
      </div>
      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="mb-[8px] ml-[32px] self-start text-[16px] font-[500]">테이블당 가격</div>
        <Slider
          range
          allowCross={false}
          defaultValue={[0, 50000]}
          min={0}
          max={50000}
          step={1000}
          value={range3}
          onChange={(val) => setRange3(val as [number, number])}
          disabled={!enable.table}
          {...sliderStyles(!!enable.table)}
          style={{ width: '83.2%', margin: 'auto' }}
        />
        <div className="mx-auto flex w-[83.2%] flex-row justify-between">
          <span className="text-[14px] font-[500] text-[#8E8E93]">0원</span>
          <span className="text-[14px] font-[500] text-[#8E8E93]">50,000원 이상</span>
        </div>
        <span
          className={`mr-[8%] self-end text-right text-[14px] font-[700] text-[#90212A] ${
            enable.table ? '' : 'invisible'
          }`}
          aria-hidden={!enable.table}
        >
          {range3[0]}원 ~ {range3[1]}원
        </span>
      </div>
      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="mb-[8px] ml-[32px] self-start text-[16px] font-[500]">인당 가격</div>
        <Slider
          range
          allowCross={false}
          defaultValue={[0, 50000]}
          min={0}
          max={50000}
          step={1000}
          value={range4}
          onChange={(val) => setRange4(val as [number, number])}
          disabled={!enable.person}
          {...sliderStyles(!!enable.person)}
          style={{ width: '83.2%', margin: 'auto' }}
        />
        <div className="mx-auto flex w-[83.2%] flex-row justify-between">
          <span className="text-[14px] font-[500] text-[#8E8E93]">0원</span>
          <span className="text-[14px] font-[500] text-[#8E8E93]">50,000원 이상</span>
        </div>
        <span
          className={`mr-[8%] self-end text-right text-[14px] font-[700] text-[#90212A] ${
            enable.person ? '' : 'invisible'
          }`}
          aria-hidden={!enable.person}
        >
          {range4[0]}원 ~ {range4[1]}원
        </span>
      </div>

      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="ml-[32px] mt-[14px] self-start text-[20px] font-[500]">기타</div>
        <div className="ml-[32px] flex w-full flex-row gap-[8px] pb-[20px]">
          {optionTypes.map((option) => {
            const active = selectedOptionsTypes.includes(option);
            return (
              <button
                key={option}
                onClick={() => {
                  toggleOption(option);
                  console.log('selectedOptions:', selectedOptionsTypes);
                }}
                aria-pressed={active}
                className={`h-[32px] w-[18%] rounded-[20px] text-[14px] font-[500] ${
                  active ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#90212A]'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Options;
