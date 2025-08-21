// import React from 'react'
import keepIcon from '../../shared/assets/keep.svg';
import clock from '../../shared/assets/clock.svg';
import bookmark from '../../shared/assets/bookmark.svg';
import share from '../../shared/assets/share.svg';
import './tip.css';
import { useNavigate } from 'react-router-dom';

interface hotStoreCardProps {
  key: number;
  restaurantId: number;
  imgUrl: string;
  keep: number;
  name: string;
  local: string;
  time: string;
}

const HotStoreCard = ({
  key,
  restaurantId,
  imgUrl,
  keep,
  name,
  local,
  time,
}: hotStoreCardProps) => {
  const navigate = useNavigate();
  const goStore = () => {
    console.log('key: ' + key);
    console.log('가게 상세 정보 페이지 이동');
    navigate(`/detailInfo/${restaurantId}`);
  };

  return (
    <div onClick={goStore} className="flex cursor-pointer flex-col justify-center">
      <div className="relative">
        {/* <img src="https://placehold.co/361x217" className="rounded-t-lg" /> */}
        <img src={imgUrl} className="h-[217px] w-[361px] rounded-t-lg" />
        <div className="absolute bottom-2 left-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <img src={keepIcon} />
              <div className="title text-[30px]">{keep}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[143px] w-[361px] flex-col justify-between rounded-b-lg bg-gradient-to-r from-[#90212A]/65 to-[#DCDBE8] pb-2 pl-3 pr-3 pt-2 text-[16px] text-white">
        <div>
          <div className="title mb-1 text-[24px]">{name}</div>
          <div>{local}</div>
          <div>{time}</div>
        </div>
        <div className="flex items-center justify-between">
          <div></div>
          <div className="flex gap-4 text-[10px] text-[#ffffff]">
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
export default HotStoreCard;
