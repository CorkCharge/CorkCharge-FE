// import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import black_x from '../../assets/detailPageImgs/black_x.svg';

interface feedbackModalProps {
  mainContent: string;
  option: string;
  handleOptClick: () => void;
}

//todo: handleOptClick 내용 없을 때 막기
const Feedback = ({ mainContent, option, handleOptClick }: feedbackModalProps) => {
  const [corkErr, setCorkErr] = useState<boolean>(false);
  const [storeErr, setStoreErr] = useState<boolean>(false);
  const handleCorkErr = () => {
    setCorkErr(true);
    setStoreErr(false);
  };
  const handleStoreErr = () => {
    setStoreErr(true);
    setCorkErr(false);
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setIsValid(value.trim().length > 0);
  };
  const navigate = useNavigate();
  const handleFeedback = () => {
    if (isValid && (corkErr || storeErr)) {
      // if (isValid || corkErr || storeErr) {
      console.log(isValid);
      console.log(corkErr);
      console.log(storeErr);
      console.log('건의하기완료');
      navigate('/detailInfo', { state: { completeFb: true } });
    } else {
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-[293px] flex-col items-center justify-center rounded-2xl bg-[#FFFFFF] bg-opacity-80 p-4 backdrop-blur-sm">
        <div className="mb-4 mt-2 flex flex-col items-center justify-center gap-2">
          <div className="text-[24px] font-bold text-[#35353F]">{mainContent}</div>
          <div className="mt-4 flex gap-2">
            <button
              className={`h-[32px] rounded-[20px] pl-4 pr-4 text-[14px] ${corkErr ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'}`}
              onClick={handleCorkErr}
            >
              콜키지 정보오류
            </button>
            <button
              className={`h-[32px] rounded-[20px] pl-4 pr-4 text-[14px] ${storeErr ? 'bg-[#90212A] text-white' : 'bg-[#F3F3F6] text-[#35353F]'}`}
              onClick={handleStoreErr}
            >
              가게 정보오류
            </button>
          </div>
        </div>

        <div className="relative mb-8 mt-2 flex h-[194px] w-[263px] items-center justify-center rounded-br-[10vw] rounded-tl-[10vw] bg-[#F3F3F6] pl-6 pr-6 shadow-[0_2px_15px_rgba(0,0,0,0.05)]">
          <textarea
            placeholder={
              corkErr
                ? '콜키지 무료인데 정보가 잘못 기재되어 있어요.'
                : storeErr
                  ? '어플에 나와있는 메뉴와 다른 메뉴가 있습니다. '
                  : '건의내용을 입력해주세요'
            }
            onChange={handleInputChange}
            className="mb-2 mt-4 h-[170px] w-[250px] resize-none bg-transparent text-[13px] text-[#9FA2AA] outline-none"
            rows={1}
          />
          <img
            src={black_x}
            onClick={handleOptClick}
            className="absolute right-3 top-5 cursor-pointer"
          />
        </div>

        <button
          onClick={handleFeedback}
          className="h-[48px] w-[263px] rounded-xl bg-white text-[17px] font-bold text-[#35353F] opacity-80"
        >
          {option}
        </button>
      </div>
    </div>
  );
};

export default Feedback;
