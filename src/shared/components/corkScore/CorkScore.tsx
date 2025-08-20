// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import etc from '../../assets/detailPageImgs/etc.svg';
import star from '../../assets/rating.svg';
import OptionMenu from './OptionMenu';

interface corkScoreProps {
  name: string;
  keep: number;
  rating: number;
  review: string;
  id: string;
  date: string;
}

const CorkScore = ({ name, keep, rating, review, id, date }: corkScoreProps) => {
  //   const navigate = useNavigate();
  // const goStore = () => {
  //   console.log('가게 상세 정보 페이지 이동');
  //   // navigate('/storeInfo');
  // };
  return (
    <div className="flex h-[144px] w-[357px] justify-between rounded-2xl bg-[#F3F3F6]">
      <div className="mb-4 ml-4 mt-4 flex w-[210px] flex-col pr-2">
        <div className="flex justify-between">
          <div className="text-[20px] font-bold">{name}</div>
          <div className="flex items-center justify-center">
            <button className="mr-2 h-[25px] w-[46px] rounded-xl bg-[#DACBB64D] text-[10px]">
              저장 {keep}
            </button>
            {/* <img className="h-[10px] w-[2px]" src={etc} /> */}
            <OptionMenu />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img className="h-[15px] w-[96px]" src={star} />
          <div className="text-[16px]">{rating}</div>
        </div>
        <div className="mb-[2px] line-clamp-2 w-[180px] text-[14px]">{review}</div>
        <div className="flex gap-2 text-[10px]">
          <div>{id}</div>
          <div>{date}</div>
        </div>
      </div>
      <img src="https://placehold.co/128X144" className="rounded-r-2xl" />
    </div>
  );
};

export default CorkScore;
