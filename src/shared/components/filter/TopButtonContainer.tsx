import { useState } from 'react';
const TopButtonContainer = () => {
  const [selectedTab, setSelectedTab] = useState<'corkage' | 'region'>('corkage');
  return (
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
  );
};

export default TopButtonContainer;
