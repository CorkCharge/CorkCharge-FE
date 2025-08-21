import { useNavigate } from 'react-router-dom';
// import etc from '../../assets/detailPageImgs/etc.svg';
import PairingArticle from './PairingArticle';
import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';
import ShowMoreBtn from './ShowMoreBtn';
import { ReviewArticle } from './ReviewArticle';
import { StarRate } from '../myPage/StarRate';
import { useRef } from 'react';
import { useState } from 'react';
import useRestaurantStore from '@/shared/store/useRestaurantStore';

// interface detailInfoProps {
//   price: string;
//   info: string[] | null;
// }

const DetailInfo = (restaurant: RestaurantInfo) => {
  const navigate = useNavigate();
  const rating = useRef(0);
  const [reviewPage, setReviewPage] = useState(1);
  const { restInfo } = useRestaurantStore();

  const setRating = (r: number) => {
    rating.current = r;
    console.log(rating.current);
  };

  const writeReview = () => {
    if (rating.current === 0) return;

    navigate('/review', { state: { rating: rating.current, restId: restaurant.restaurantId } });
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
      <div className="flex h-[60px] w-full items-center justify-center gap-4 pl-4 pr-4">
        <div className="flex h-[40px] w-[360px] w-full cursor-pointer items-center justify-center rounded-br-full rounded-tl-full bg-[#F3F3F6] pl-6 pr-6">
          <div className="flex w-full justify-center gap-2">
            <StarRate rate={0} isEditable={true} starRating={setRating} />
            <div className="ml-4 flex items-center gap-1" onClick={writeReview}>
              <div className="whitespace-nowrap text-[14px] underline">리뷰쓰기</div>
              <div>🡭</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        {restaurant.reviews &&
          restInfo.reviews.slice(0, 5 * reviewPage).map((review) => {
            return <ReviewArticle name={restaurant.restaurantName} review={review} />;
          })}
      </div>

      {/* <ReviewArticle name={restaurant.restaurantName} review={restaurant.reviews[0]} /> */}
      <ShowMoreBtn onClick={() => setReviewPage((prev) => prev + 1)} />
    </div>
  );
};

export default DetailInfo;
