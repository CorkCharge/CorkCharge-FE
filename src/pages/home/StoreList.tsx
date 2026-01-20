import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Curation from '../../shared/components/Curation';
import Tip from '../../shared/components/Tip';
import TopBar from '../../shared/components/SearchBar';
import { OverLayImage } from '@/shared/components/common/OverLayImage';
import { fetchTipList, type TipData } from '@/shared/apis/tip/tipListApi';
import type { Selected } from '@/shared/components/home/home.types';
import ReviewItem from '@/shared/components/home/ReviewItem';
import StoresInfo from '@/shared/components/home/StoresInfo';
import type { ReviewResponse } from '@/shared/apis/review/review.type';
import { fetchHomeReviews } from '@/shared/apis/review/review.api';
import { fetchHomeStoreCard } from '@/shared/apis/restaurant/restaurant.api';
import type { StoreCard } from '@/shared/apis/restaurant/restaurant.type';

import smallGlass from '../../shared/assets/smallGlass.svg';
import bell from '@/shared/assets/bell.svg';
import bannerCover from '@/shared/components/home/assets/banner-cover.png';
import newStore from '@/shared/components/home/assets/new-store.png';
import stars from '@/shared/components/home/assets/stars.png';
import arrow from '@/shared/assets/right_arrow.svg';

const StoreList = () => {
  const navigate = useNavigate();

  const [storeSelected, setStoreSelected] = useState<boolean>(true);
  const [selected, setSelected] = useState<Selected>('ALL');
  const [tiplist, setTiplist] = useState<TipData[]>([]);
  const [reviewCards, setReviewCards] = useState<ReviewResponse[]>([]);

  const [nearStores, setNearStores] = useState<StoreCard[]>([]);
  const [hotStores, setHotStores] = useState<StoreCard[]>([]);

  const handleStoreclick = () => {
    setStoreSelected(true);
  };
  const handleTipclick = () => {
    setStoreSelected(false);
  };

  const handleRequest = () => {
    navigate('/doit');
  };
  const handleNewStore = () => {
    navigate('/new-stores');
  };

  useEffect(() => {
    fetchTipData();
    getReviewCards();
    getHomeStores();
  }, []);

  // 홈화면 tip 가져오기
  const fetchTipData = async () => {
    try {
      const res = await fetchTipList();
      setTiplist(res);
    } catch (e) {
      console.error('Tip 가져오기 실패: ' + e);
    }
  };

  // 홈화면 매장 가져오기
  const getHomeStores = async () => {
    try {
      const res = await fetchHomeStoreCard();
      setNearStores(res.nearbyCard);
      setHotStores(res.recommendCard);
    } catch (e) {
      console.error('근처 매장 가져오기 실패: ' + e);
    }
  };

  // 홈화면 콜키지 리뷰 가져오기
  const getReviewCards = async () => {
    const res = await fetchHomeReviews();
    setReviewCards(res);
  };

  const filtered = selected === 'ALL' ? tiplist : tiplist.filter((t) => t.tipCategory === selected);

  const renderReviewItem = () =>
    reviewCards.map((review) => <ReviewItem key={review.reviewId} review={review} />);

  return (
    <div className="flex flex-col items-center bg-[rgba(255,255,255,0.8)]">
      {/* 검색창 */}
      <div className="flex w-full px-4" style={{ boxShadow: '0 4px 7px 0px rgba(0, 0, 0, 0.1)' }}>
        <TopBar searchDisabled={false} className="flex-1" />
        <img src={bell} className="cursor-pointer" onClick={() => navigate('/notification')} />
      </div>

      {/* 배너 */}
      <OverLayImage
        src={bannerCover}
        className="mt-5 aspect-[2/1] cursor-pointer"
        paddingX="16px"
        onClick={() => navigate('/tip-article/1')}
      >
        <div className="absolute bottom-6 left-10 text-white">
          <p className="text-sm font-medium sm:text-base">페어링 큐레이션</p>
          <p className="font-bold sm:text-xl">회식 메뉴에 따라 달라지는 술 선택법</p>
        </div>
      </OverLayImage>

      <div className="mt-4 flex w-full flex-col items-center gap-4 px-4">
        {/* 해주세요 & 신규매장 */}
        <div className="flex w-full gap-2">
          <button
            onClick={handleRequest}
            className="flex h-[80px] flex-1 items-center justify-center rounded-[16px] bg-[var(--glass-soft)]"
          >
            <img src={smallGlass}></img>
            <span className="text-lg font-medium">해주세요</span>
          </button>
          <button
            onClick={handleNewStore}
            className="flex h-[80px] flex-1 items-center justify-center gap-2 rounded-[16px] bg-[var(--glass-soft)]"
          >
            <img src={newStore} className="h-[45px] w-[51px]"></img>
            <span className="text-lg font-medium">신규매장</span>
          </button>
        </div>
      </div>

      {/* 콜키지 리뷰 */}
      <div className="relative mt-4 w-full px-4">
        <div className="flex items-center gap-2">
          <img src={stars} className="h-[18px] w-5" />
          <span className="font-bold">콜키지 리뷰</span>
        </div>
        <p className="mt-1 pl-5 text-sm text-[var(--gray-6)]">
          코르크차지만의 콜키지 리뷰를 확인해보세요
        </p>
        <img
          src={arrow}
          className="absolute right-5 top-1 h-[17px] w-[10px] cursor-pointer"
          onClick={() => navigate('/corkage-review')}
        />
      </div>

      <div className="mt-2 flex w-full gap-2 overflow-x-scroll px-4">{renderReviewItem()}</div>

      {/* Tip & 매장 */}
      <div className="mt-5 w-full">
        <div className="flex h-[30px] w-full items-center justify-between gap-14 border-b px-[30px]">
          <button
            onClick={handleTipclick}
            className={`h-full w-[120px] flex-1 border-x-0 border-b-2 border-t-0 border-solid ${!storeSelected ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
          >
            Tip
          </button>
          <button
            onClick={handleStoreclick}
            className={`h-full w-[120px] flex-1 border-x-0 border-b-2 border-t-0 border-solid ${storeSelected ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
          >
            매장
          </button>
        </div>

        {storeSelected ? (
          <StoresInfo nearStores={nearStores} hotStores={hotStores} />
        ) : (
          <>
            <Tip selected={selected} setSelected={setSelected} />
            <Curation tiplist={filtered} />
          </>
        )}
      </div>
    </div>
  );
};

export default StoreList;
