// import React from 'react'
import star from '../../assets/detailPageImgs/star.svg';
import black_x from '../../assets/detailPageImgs/black_x.svg';
import camera from '../../assets/detailPageImgs/camera.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Review = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setIsValid(value.trim().length > 0);
  };
  const handleReview = () => {
    if (isValid) {
      console.log('리뷰등록완료');
      navigate('/detailInfo', { state: { openReviewModal: true } });
    } else {
      return;
    }
  };
  const handleCancel = () => {
    console.log('리뷰 등록취소');
    navigate('/detailInfo');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-6 text-[16px] font-bold">리뷰</div>
      <div className="mb-12 mt-12 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center text-[30px] font-bold">
          <div>앤비햄버거에서의</div>
          <div>콜키지는 어떠셨나요?</div>
        </div>
        <div className="flex gap-2">
          <img src={star} className="h-[29px] w-[30px]" />
          <img src={star} className="h-[29px] w-[30px]" />
          <img src={star} className="h-[29px] w-[30px]" />
          <img src={star} className="h-[29px] w-[30px]" />
          <img src={star} className="h-[29px] w-[30px]" />
        </div>
      </div>
      <div className="relative flex h-[288px] w-[361px] items-center justify-center rounded-br-[10vw] rounded-tl-[10vw] bg-[#FFFFFF] pl-6 pr-6 shadow-[0_2px_15px_rgba(0,0,0,0.05)]">
        <textarea
          placeholder="리뷰를 입력해주세요"
          onChange={handleInputChange}
          className="mb-12 ml-2 mr-4 mt-16 h-[270px] w-[340px] resize-none bg-transparent text-[17px] text-[#9FA2AA] outline-none"
          rows={1}
        />
        <img
          src={black_x}
          onClick={handleCancel}
          className="absolute right-3 top-6 cursor-pointer"
        />
      </div>
      <div className="mb-4 mt-4 flex h-[48px] w-[361px] cursor-pointer items-center justify-center rounded-[10px] border border-[#90212A] bg-white">
        <div className="flex gap-2">
          <img src={camera} />
          <div className="text-[16px] font-bold text-[#90212A]">사진 첨부하기</div>
        </div>
      </div>
      <div
        onClick={handleReview}
        className={`mb-4 mt-12 flex h-[48px] w-[361px] items-center justify-center rounded-[10px] ${isValid ? 'cursor-pointer bg-[#90212A]' : 'cursor-not-allowed bg-[#FFFFFF]'} shadow-[0_2px_18px_rgba(0,0,0,0.1)]`}
      >
        <div className="flex gap-2">
          <div className={`text-[16px] font-bold ${isValid ? 'text-white' : 'text-[#35353F]'}`}>
            리뷰 등록하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
