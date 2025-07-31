// import React from 'react';
import bookmark from '../assets/bookmark.svg';
import clock from '../assets/clock.svg';
import share from '../assets/share.svg';
import star from '../assets/star.svg';
import keepIcon from '../assets/keep.svg';
// import { useNavigate } from 'react-router-dom';

interface storeProps {
  keep: number;
  price: number;
  name: string;
  local: string;
  time: string;
  rating: number;
  review: number;
}

const StoreCard = ({ keep, price, name, local, time, rating, review }: storeProps) => {
  //   const navigate = useNavigate();
  const goStore = () => {
    console.log('가게 상세 정보 페이지 이동');
    // navigate('/storeInfo');
  };
  return (
    <div
      onClick={goStore}
      className="mb-4 h-[365px] w-[361px] cursor-pointer border border-x-0 border-t-0 border-b-slate-300"
    >
      <div className="mb-[10px] h-[220px] w-[361px]">
        <div className="relative">
          <img src="https://placehold.co/361x170" className="rounded-t-lg" />
          <div className="absolute bottom-2 left-4">
            <div className="flex gap-2">
              <img src={keepIcon} />
              <span className="text-[18px] font-bold text-white">{keep}</span>
            </div>
          </div>
        </div>
        <div className="flex h-[50px] items-center justify-center rounded-b-lg bg-gradient-to-r from-[#90212A]/65 to-[#DCDBE8] text-[18px] font-bold text-white">
          병당 콜키지: 1병 {price}만원
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="mb-[2px] text-[20px] font-bold">{name}</div>
        <div>
          <div>{local}</div>
          <div>{time}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <img src={star} />
            <span>{rating}</span>
            <span> 리뷰 total {review}</span>
          </div>
          <div className="flex gap-4 text-[10px] text-[#C5C8CF]">
            <div>
              <img src={clock} />
              <div>예약</div>
            </div>
            <div>
              <img src={bookmark} />
              <div>저장</div>
            </div>
            <div>
              <img src={share} />
              <div>공유</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
