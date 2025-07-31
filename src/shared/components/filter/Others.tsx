import { useState } from 'react';
const Others = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  return (
    <div className="flex w-full flex-col gap-[4px] self-start">
      <div className="ml-[32px] mt-[14px] self-start text-[20px] font-[500]">기타</div>
      <div className="ml-[32px] flex w-full flex-row gap-[8px]">
        {['잔제공', '얼음제공', '한병 무료', '다중 콜키지'].map((option) => (
          <button
            key={option}
            onClick={() => {
              setSelectedOption(option);
              console.log(option);
            }}
            className={`h-[32px] w-[18%] rounded-[20px] text-[14px] font-[500] ${
              selectedOption === option ? `bg-[#90212A] text-white` : `bg-[#F3F3F6] text-[#90212A]`
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Others;
