import { useState } from 'react';
import Slider from 'rc-slider';
const CorkageStore = () => {
  const [range, setRange] = useState<[number, number]>([0, 5]);

  return (
    <div className="flex w-full flex-col gap-[4px] self-start">
      <div className="mb-[8px] ml-[32px] mt-[16px] self-start text-[20px] font-[500]">
        콜키지 스토어
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
        <span className="text-[14px] font-[500] text-[#8E8E93]">0점</span>
        <span className="text-[14px] font-[500] text-[#8E8E93]">5점</span>
      </div>
      <span className="mr-[8%] self-end text-right text-[14px] font-[700] text-[#90212A]">
        {range[0]}점 ~ {range[1]}점
      </span>
    </div>
  );
};

export default CorkageStore;
