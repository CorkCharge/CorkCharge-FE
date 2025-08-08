import { useState } from 'react';
const Others = () => {
  const [selectedOptionsTypes, setSelectedOptionsTypes] = useState<string[]>([]);
  const [selectedCorkageTypes, setSelectedCorkageTypes] = useState<string[]>([]);
  const optionTypes = ['잔제공', '얼음제공'];
  const corkageTypes = ['한병 무료', '다중 콜키지'];

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

  return (
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
  );
};

export default Others;
