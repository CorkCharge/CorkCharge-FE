import selectArrow from '../../assets/selectArrow.svg';
import { useState } from 'react';

const SelectBox = () => {
  const options = ['1일', '3일', '일주일', '한달'];
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(options[0]);

  return (
    <div className="relative pb-2 pt-2">
      <div className="relative">
        <button
          className="flex h-[26px] w-[50px] items-center justify-center gap-1 whitespace-nowrap rounded-full bg-[#F3F3F6] px-4 py-2 pb-1 pt-1 text-[12px] text-[#80818B] shadow-xl"
          onClick={() => setOpen(!open)}
        >
          {selected}
          <img src={selectArrow} className="h-[7px] w-[4px]" />
        </button>
        {open && (
          <ul className="absolute right-0 top-8 flex h-[111px] w-[66px] flex-col items-center justify-center gap-1 overflow-hidden rounded-xl bg-[#F3F3F6] shadow-xl">
            {options.map((opt) => (
              <li
                key={opt}
                className={`flex w-[50px] cursor-pointer items-center justify-center border border-x-0 border-t-0 text-[12px] ${selected === opt ? 'text-[#90212A]' : 'text-[#80818B]'}`}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectBox;
