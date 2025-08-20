// import React from 'react'
// import { useNavigate } from 'react-router-dom';
import star from '../../assets/detailPageImgs/star.svg';
// import etc from '../../assets/detailPageImgs/etc.svg';
import PairingArticle from './PairingArticle';
import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import ShowMoreBtn from './ShowMoreBtn';
import { ReviewArticle } from './ReviewArticle';
import { StarRate } from '../myPage/StarRate';

// interface detailInfoProps {
//   price: string;
//   info: string[] | null;
// }

//todo: 저장 버튼 및 ... 버튼 기능 추가
const DetailInfo = (restaurant: RestaurantInfo) => {
  // const navigate = useNavigate();
  const onclick = () => {
    console.log('리뷰창 이동');
    // navigate('/review');
  };
  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-4">
        <div className="border border-x-0 pb-1 pt-4 text-[16px] font-bold">콜키지 정보</div>
        <div className="flex gap-12 border border-x-0 pb-2 pt-2">
          <div className="text-[16px] font-bold">비용</div>
          <div>{restaurant.corkagePrice}</div>
        </div>
        <div className="flex w-full gap-12 pb-2 pr-2 pt-2">
          <div className="whitespace-nowrap text-[16px] font-bold">기타</div>
          <div className="whitespace-pre-line break-words">
            {/* <div>{info}</div> */}
            {/* 쉼표를 개행문자로 변환하여 줄바꿈 처리*/}
            <div style={{ whiteSpace: 'pre-line' }}>
              {restaurant.corkageOptions?.join(', ').replace(/,\s*/g, '\n')}
            </div>
          </div>
        </div>
      </div>
      <PairingArticle {...restaurant} />
      <div className="flex h-[60px] items-center justify-center gap-4 pl-4 pr-4">
        <div
          onClick={onclick}
          className="flex h-[40px] w-[360px] cursor-pointer items-center justify-center rounded-br-full rounded-tl-full bg-[#F3F3F6] pl-6 pr-6"
        >
          <div className="flex gap-2">
            {/* <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} /> */}
            <StarRate rate={0} isEditable={true} />
            <div className="ml-4 flex items-center gap-1">
              <div className="whitespace-nowrap text-[14px] underline">리뷰쓰기</div>
              <div>🡭</div>
            </div>
          </div>
        </div>
      </div>
      {restaurant.reviews &&
        restaurant.reviews.map((review) => {
          return <ReviewArticle name={restaurant.restaurantName} review={review} />;
        })}

      {/* <ReviewArticle name={restaurant.restaurantName} review={restaurant.reviews[0]} /> */}
      <ShowMoreBtn />
    </div>
  );
};

export default DetailInfo;
