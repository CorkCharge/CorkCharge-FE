import { useState } from 'react';
import Circle from './circle.svg';
import Checked from './checked_circle.svg';
import Bg from './bg.svg';

const StoreItem = () => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div
      className={`relative z-10 flex h-[88px] w-[361px] flex-row items-center rounded-[16px] ${
        isChecked ? '' : 'bg-[#F3F3F6]'
      }`}
    >
      {isChecked && (
        <img
          src={Bg}
          alt="선택된 배경"
          className="absolute left-0 top-0 -z-10 h-full w-full rounded-[16px] object-cover"
        />
      )}
      <div className="flex w-[310px] flex-col">
        <div
          className={`ml-[16px] text-[20px] font-[700] ${isChecked ? 'text-white' : 'text-black'}`}
        >
          깍둑 - 경희대점
        </div>
        <div
          className={`ml-[16px] text-[14px] font-[500] ${isChecked ? 'text-white' : 'text-black'}`}
        >
          서울 광진구 아차산로 24 2층
        </div>
      </div>
      {/* 라디오 버튼 */}
      <img
        src={isChecked ? Checked : Circle}
        alt="라디오버튼"
        className="cursor-pointer"
        onClick={toggleChecked}
      />
    </div>
  );
};

export default StoreItem;
