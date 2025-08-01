import { useState } from 'react';
import Slider from 'rc-slider';

const PricePerPerson = () => {
  const [range3, setRange3] = useState<[number, number]>([0, 50000]);
  return (
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
        trackStyle={[{ backgroundColor: '#90212A', height: 6 }]}
        handleStyle={[
          {
            borderColor: '#90212A',
            height: 24,
            width: 24,
            marginTop: -10,
            backgroundColor: 'white',
            boxShadow: '0 0 5px rgba(0,0,0,0.2)',
          },
          {
            borderColor: '#90212A',
            height: 24,
            width: 24,
            marginTop: -10,
            backgroundColor: 'white',
            boxShadow: '0 0 5px rgba(0,0,0,0.2)',
          },
        ]}
        railStyle={{ backgroundColor: '#E5E5EA', height: 6 }}
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
  );
};

export default PricePerPerson;
