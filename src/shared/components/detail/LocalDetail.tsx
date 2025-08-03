// import React from 'react'
import x from '../../assets/detailPageImgs/x.svg';

interface funcProps {
  showLocal: boolean;
  setShowLocal: (value: boolean) => void;
}

const LocalDetail = ({ showLocal, setShowLocal }: funcProps) => {
  return (
    <div className="relative flex h-[88px] w-[340px] flex-col gap-1 rounded-lg bg-white p-2 shadow-[0_4px_18px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-3">
        <span className="mr-2 rounded-full bg-[#F3F3F6] px-3 py-1 text-[9px] font-semibold text-[#90212A]">
          도로명
        </span>
        <span className="text-[12px] font-semibold text-[#35353F]">
          서울 광진구 아차산로49길 12 1층
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="mr-4 rounded-full bg-[#F3F3F6] px-3 py-1 text-[9px] font-semibold text-[#90212A]">
          지번
        </span>
        <span className="text-[12px] font-semibold text-[#35353F]">서울 광진구 구의동 246-23</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#90212A] px-3 py-1 text-[9px] font-semibold text-white">
            우편번호
          </span>
          <span className="text-[12px] font-semibold text-[#35353F]">05044</span>
        </div>
      </div>

      {/* 닫기 버튼 */}
      <button className="absolute right-3 top-3">
        <img src={x} className="cursor-pointer" onClick={() => setShowLocal(!showLocal)} />
      </button>
    </div>
  );
};

export default LocalDetail;
