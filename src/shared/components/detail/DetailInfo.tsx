// import React from 'react'
import { useNavigate } from 'react-router-dom';
import star from '../../assets/detailPageImgs/star.svg';
import etc from '../../assets/detailPageImgs/etc.svg';
import PairingArticle from './PairingArticle';

interface detailInfoProps {
  price: string;
  info: string;
}

//todo: 저장 버튼 및 ... 버튼 기능 추가
const DetailInfo = ({ price, info }: detailInfoProps) => {
  const navigate = useNavigate();
  const onclick = () => {
    console.log('리뷰창 이동');
    navigate('/review');
  };
  return (
    <div className="flex flex-col items-center">
      <div className="w-[360px]">
        <div className="border border-x-0 pb-1 pt-4 text-[16px] font-bold">콜키지 정보</div>
        <div className="flex gap-12 border border-x-0 pb-2 pt-2">
          <div className="text-[16px] font-bold">비용</div>
          <div>{price}</div>
        </div>
        <div className="flex gap-12 pb-2 pt-2">
          <div className="text-[16px] font-bold">기타</div>
          <div>{info}</div>
        </div>
      </div>
      <div className="flex h-[60px] items-center justify-center gap-4 pl-4 pr-4">
        <div
          onClick={onclick}
          className="flex h-[40px] w-[360px] cursor-pointer items-center justify-center rounded-br-full rounded-tl-full bg-[#F3F3F6] pl-6 pr-6"
        >
          <div className="flex gap-2">
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <div className="ml-4 flex items-center gap-1">
              <div className="text-[14px] underline">리뷰쓰기</div>
              <div>🡭</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[144px] w-[357px] justify-between rounded-2xl bg-[#F3F3F6]">
        <div className="mb-4 ml-4 mt-4 flex flex-col gap-2">
          <div className="flex">
            <div className="mr-12 text-[20px] font-bold">엔비 햄버거</div>
            <button className="mr-2 w-[46px] rounded-xl bg-[#DACBB64D] text-[10px]">저장 27</button>
            <img src={etc} />
          </div>
          <div className="w-[180px] text-[14px]">
            몰트향과 완벽하게 어우러지는 조화로운 페어링입니다.
          </div>
          <div className="flex gap-2 text-[10px]">
            <div>니콜라 테슬라</div>
            <div>2025.01.01</div>
          </div>
        </div>
        <img src="https://placehold.co/128X144" className="rounded-r-2xl" />
      </div>
      <PairingArticle />
    </div>
  );
};

export default DetailInfo;
