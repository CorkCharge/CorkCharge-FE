import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Back from '../../shared/assets/left_arrow.svg';
import X from '../doit/assets/x.svg';
import Slider from 'rc-slider';

const Filter = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'corkage' | 'region'>('corkage');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  const [range, setRange] = useState<[number, number]>([0, 5]);
  const [range2, setRange2] = useState<[number, number]>([0, 50000]);
  const [range3, setRange3] = useState<[number, number]>([0, 50000]);
  const [range4, setRange4] = useState<[number, number]>([0, 50000]);

  return (
    <main className="relative flex h-screen flex-col items-center">
      {/* 헤더1 */}
      <header className="mt-[7vh] flex h-[48px] w-full flex-row place-content-between items-center">
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="ml-[12px] h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={handleBackClick}
        />
        <p className="text-[16px] font-[700]">필터</p>
        <img src={X} alt="x" className="mr-[12px] h-[17px] w-[17px]" />
      </header>
      <div className="mx-auto mt-[12px] flex h-[48px] w-[91.8%] flex-row items-center rounded-[8px] bg-[#F3F3F6]">
        <button
          onClick={() => setSelectedTab('corkage')}
          className={`h-[83.3%] w-[49.4%] rounded-[8px] text-[14px] font-[500] ${
            selectedTab === 'corkage' ? 'bg-[#90212A] text-white' : ''
          }`}
        >
          콜키지
        </button>
        <button
          onClick={() => setSelectedTab('region')}
          className={`h-[83.3%] w-[49.4%] rounded-[8px] text-[14px] font-[500] ${
            selectedTab === 'region' ? 'bg-[#90212A] text-white' : ''
          }`}
        >
          지역
        </button>
      </div>
      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="ml-[32px] mt-[14px] self-start text-[20px] font-[500]">업종</div>
        <div className="ml-[32px] flex w-full flex-row gap-[8px]">
          {['한식', '중식', '양식', '일식'].map((category) => (
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
      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="mb-[8px] ml-[32px] mt-[16px] self-start text-[20px] font-[500]">가격</div>
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
          {range2[0]}원 ~ {range2[1]}원
        </span>
      </div>
      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="mb-[8px] ml-[32px] mt-[8px] self-start text-[16px] font-[500]">
          인당 가격
        </div>
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
      <div className="flex w-full flex-col gap-[4px] self-start">
        <div className="mb-[8px] ml-[32px] mt-[8px] self-start text-[16px] font-[500]">
          테이블당 가격
        </div>
        <Slider
          range
          allowCross={false}
          defaultValue={[0, 50000]}
          min={0}
          max={50000}
          step={1000}
          value={range4}
          onChange={(val) => setRange4(val as [number, number])}
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
          {range4[0]}원 ~ {range4[1]}원
        </span>
      </div>
    </main>
  );
};

export default Filter;
