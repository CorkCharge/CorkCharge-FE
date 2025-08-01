// import React from 'react'

interface modalProps {
  mainContent: string;
  subContent?: string;
  info?: string[];
  option1: string;
  option2?: string;
  handleOpt1Click: () => void;
  handleOpt2Click?: () => void;
}

const Modal = ({
  mainContent,
  subContent,
  info,
  option1,
  option2,
  handleOpt1Click,
  handleOpt2Click,
}: modalProps) => {
  const isTwoOpt = !!option2; //값 존재 유무에 따라 bool 값
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-[293px] flex-col items-center justify-center rounded-2xl bg-[#FFFFFF] bg-opacity-80 p-4 backdrop-blur-sm">
        <div className="mb-4 mt-2 flex flex-col items-center justify-center gap-2">
          <div className="text-[24px] font-bold text-[#35353F]">{mainContent}</div>
          <div>{subContent}</div>
          {info && (
            <div className="mb-4 ml-4 text-left text-[14px] text-[#80818B]">
              {info.map((line, idx) => (
                <p
                  key={idx}
                  className={idx === info.length - 1 ? 'font-semibold text-[#749755]' : ''}
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          {isTwoOpt ? (
            <div className="flex gap-2">
              <button
                onClick={handleOpt1Click}
                className="h-[48px] w-[126px] rounded-xl bg-white text-[16px] font-bold text-[#35353F] opacity-80"
              >
                {option1}
              </button>
              <button
                onClick={handleOpt2Click}
                className="h-[48px] w-[126px] rounded-xl bg-white text-[16px] font-bold text-[#35353F] opacity-80"
              >
                {option2}
              </button>
            </div>
          ) : (
            <button
              onClick={handleOpt1Click}
              className="h-[48px] w-[263px] rounded-xl bg-white text-[17px] font-bold text-[#35353F] opacity-80"
            >
              {option1}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
