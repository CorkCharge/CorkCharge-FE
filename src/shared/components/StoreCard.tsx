// import React from 'react';
import bookmark from '@/shared/components/home/assets/keep.svg';
import share from '@/shared/components/home/assets/share.svg';
import star from '../assets/star.svg';
import keepIcon from '../assets/keep.svg';
import bookmarked from '@/shared/components/keep/assets/bookmarked.svg';
import { useNavigate } from 'react-router-dom';
import { bookmarkRequest, deleteRequest } from '../apis/bookmark/bookmarkApi';
import { useState } from 'react';

interface storeProps {
  key?: number;
  restaurantId?: number;
  imageUrl?: string;
  keep: number;
  price: string;
  name: string;
  local: string;
  rating: number;
  time?: string;
  review?: number;
}

const StoreCard = ({
  key,
  restaurantId,
  imageUrl,
  keep,
  price,
  name,
  local,
  rating,
  time,
  review,
}: storeProps) => {
  const navigate = useNavigate();
  const goStore = () => {
    console.log('restaurantId: ' + key);
    console.log('가게 상세 정보 페이지 이동');
    navigate(`/detailInfo/${restaurantId}`);
  };

  //가게 저장하기
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const keepStore = async () => {
    try {
      const res = await bookmarkRequest({
        targetId: restaurantId ?? 0,
        targetType: 'RESTAURANT',
      });
      console.log('저장성공: ', res);
    } catch (err) {
      console.log('저장실패: ', err);
    }
  };

  //가게 저장취소
  const deleteStore = async () => {
    try {
      const res = await deleteRequest({
        targetId: restaurantId ?? 0,
        targetType: 'RESTAURANT',
      });
      console.log('가게 저장 삭제성공: ', res);
    } catch (err) {
      console.log('가게 저장 삭제실패: ', err);
    }
  };

  const [pending, setPending] = useState<boolean>(false);
  const onBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pending) return;
    setPending(true);
    try {
      if (isBookmarked) {
        await deleteStore();
        setIsBookmarked(false);
        // console.log('가게 저장 삭제성공');
      } else {
        await keepStore();
        setIsBookmarked(true);
        // console.log('저장성공');
      }
    } catch (err) {
      console.log('북마크 토글 실패:', err);
    } finally {
      setPending(false);
    }
  };

  return (
    <div
      onClick={goStore}
      className="mb-4 w-[361px] cursor-pointer rounded-t-lg border border-x-0 border-t-0 border-b-slate-300 pb-2"
    >
      <div className="mb-[10px] h-[220px] w-[361px]">
        <div className="relative">
          {/* <img src="https://placehold.co/361x170" className="rounded-t-lg" />  */}
          <img
            src={imageUrl || 'https://placehold.co/361x170'}
            className="h-[170px] w-[361px] overflow-hidden rounded-t-xl"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== 'https://placehold.co/361x170') {
                img.onerror = null;
                img.src = 'https://placehold.co/361x170';
              }
            }}
          />
          <div className="absolute bottom-2 left-4">
            <div className="flex gap-2">
              <img src={keepIcon} />
              <span className="text-[18px] font-bold text-white">{keep}</span>
            </div>
          </div>
        </div>
        <div className="flex h-[50px] items-center justify-center rounded-b-lg bg-gradient-to-r from-[#90212A]/65 to-[#DCDBE8] text-[18px] font-bold text-white">
          {price}
        </div>
      </div>
      <div className="flex flex-col gap-6 pl-2 pr-2">
        <div>
          <div className="mb-[2px] text-[20px] font-bold">{name}</div>
          <div>
            <div>{local}</div>
            {/* <div>{time}</div> */}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <img src={star} />
            <span>{rating}</span>
            <span> 리뷰 total {review}</span>
          </div>
          <div className="flex gap-4 text-[10px] text-[#C5C8CF]">
            <div
              // onClick={(e) => {
              //   e.stopPropagation();
              //   // keepStore();
              //   // setIsBookmarked(!isBookmarked);
              // }}
              onClick={onBookmarkClick}
            >
              <img src={isBookmarked ? bookmarked : bookmark} />
              <div className={`${isBookmarked ? 'text-[#90212A]' : 'text-[#C5C8CF]'}`}>저장</div>
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
