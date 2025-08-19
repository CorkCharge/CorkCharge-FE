// import React from 'react'
import corkcharge from '@/shared/components/detail/assets/corkcharge.svg';
import close from '@/shared/components/detail/assets/close.svg';

interface shareModalProps {
  handleOpt1Click: () => void;
  handleOpt2Click: () => void;
}

const Share = ({ handleOpt1Click, handleOpt2Click }: shareModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-[293px] flex-col items-center justify-center rounded-2xl bg-[#FFFFFF] bg-opacity-80 p-4 backdrop-blur-sm">
        <div className="flex w-[263px] items-center justify-between">
          {/* <div>이미지</div> */}
          <div className="flex gap-4">
            <img src={corkcharge} />
            <div>
              <div className="text-[16px] font-semibold text-[#000000]">앤비햄버거</div>
              <div className="text-[13px] text-[#3C3C4399]">corkcharge.com</div>
            </div>
          </div>
          <div></div>
          <img src={close} className="cursor-pointer" onClick={handleOpt2Click} />
        </div>
        <div className="h-[30px]"></div>
        <button
          onClick={handleOpt1Click}
          className="h-[48px] w-[263px] rounded-xl bg-white text-[17px] font-bold text-[#35353F] opacity-80"
        >
          링크 복사하기
        </button>
      </div>
    </div>
  );
};

export default Share;
