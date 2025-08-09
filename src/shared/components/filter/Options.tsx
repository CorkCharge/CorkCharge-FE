import { useState, useMemo } from 'react';
import Slider from 'rc-slider';

const Options = () => {
  const [range, setRange] = useState<[number, number]>([0, 5]);
  const [range2, setRange2] = useState<[number, number]>([0, 50000]);
  const [range3, setRange3] = useState<[number, number]>([0, 50000]);
  const [range4, setRange4] = useState<[number, number]>([0, 50000]);
  const [selectedOptionsTypes, setSelectedOptionsTypes] = useState<string[]>([]);
  const [selectedCorkageTypes, setSelectedCorkageTypes] = useState<string[]>([]);
  const optionTypes = ['잔제공', '얼음제공'];
  const corkageTypes = ['한병 무료', '두병무료'];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 어떤 슬라이더를 활성화할지 결정 (첫 번째 슬라이더는 항상 활성)
  const enable = useMemo(() => {
    return {
      bottle: selectedCategory === '병당',
      person: selectedCategory === '인당',
      table: selectedCategory === '테이블당',
    };
  }, [selectedCategory]);

  const toggleOption = (option: string) => {
    setSelectedOptionsTypes((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const toggleOption2 = (option: string) => {
    setSelectedCorkageTypes((prev) =>
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
          <div className="ml-[32px] mt-[14px] self-start text-[20px] font-[500]">업종</div>
          <div className="ml-[32px] flex w-full flex-row gap-[8px]">
            {['프리', '병당', '인당', '테이블당', '다중'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`h-[32px] w-[14%] rounded-[20px] text-[14px] font-[500] ${
                  selectedCategory === category
                    ? `bg-[#90212A] text-white`
                    : `bg-[#F3F3F6] text-[#90212A]`
                }`}
              >
                {category}
              </button>
            ))}
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
        <div className="ml-[32px]">가격표시공간</div>
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
        <span className="mr-[8%] self-end text-right text-[14px] font-[700] text-[#90212A]">
          {range2[0]}원 ~ {range2[1]}원
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
          value={range3}
          onChange={(val) => setRange3(val as [number, number])}
          disabled={!enable.person}
          {...sliderStyles(!!enable.person)}
          style={{ width: '83.2%', margin: 'auto' }}
        />
        <div className="mx-auto flex w-[83.2%] flex-row justify-between">
          <span className="text-[14px] font-[500] text-[#8E8E93]">0원</span>
          <span className="text-[14px] font-[500] text-[#8E8E93]">50,000원 이상</span>
        </div>
        <span className="mr-[8%] self-end text-right text-[14px] font-[700] text-[#90212A]">
          {range3[0]}원 ~ {range3[1]}원
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
          value={range4}
          onChange={(val) => setRange4(val as [number, number])}
          disabled={!enable.table}
          {...sliderStyles(!!enable.table)}
          style={{ width: '83.2%', margin: 'auto' }}
        />
        <div className="mx-auto flex w-[83.2%] flex-row justify-between">
          <span className="text-[14px] font-[500] text-[#8E8E93]">0원</span>
          <span className="text-[14px] font-[500] text-[#8E8E93]">50,000원 이상</span>
        </div>
        <span className="mr-[8%] self-end text-right text-[14px] font-[700] text-[#90212A]">
          {range4[0]}원 ~ {range4[1]}원
        </span>
      </div>
      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="ml-[32px] mt-[14px] self-start text-[20px] font-[500]">기타</div>
        <div className="ml-[32px] flex w-full flex-row gap-[8px]">
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
          {corkageTypes.map((option) => {
            const active = selectedCorkageTypes.includes(option);
            return (
              <button
                key={option}
                onClick={() => {
                  toggleOption2(option);
                  console.log('selectedCorkageTypes:', selectedCorkageTypes);
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
