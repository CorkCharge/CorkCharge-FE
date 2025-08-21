// import React from 'react';
import StoreCard from '../../shared/components/StoreCard';
import Curation from '../../shared/components/Curation';
import Tip from '../../shared/components/Tip';
import TopBar from '../../shared/components/SearchBar';
import Glass from '../../shared/assets/glass.svg';
import smallGlass from '../../shared/assets/smallGlass.svg';
import arrow from '../../shared/assets/arrow.svg';
import hotstore from '../../shared/assets/hotstore.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import keepIcon from '../../shared/assets/keep.svg';
import { type Corkage, fetchCorkageList } from '@/shared/apis/restaurant/corkageApi';
import { fetchTipList, type TipList } from '@/shared/apis/tip/tipListApi';
import type { Selected } from '@/shared/components/home/type';
import {
  fetchHomeRestaurant,
  type HomeRestaruantInfo,
} from '@/shared/apis/restaurant/homeRestaurantApi';

const StoreList = () => {
  const [storeSelected, setStoreSelected] = useState<boolean>(false);
  const [tipSelected, setTipSelected] = useState<boolean>(true);

  const [corkages, setCorkage] = useState<Corkage[]>([]);

  const handleStoreclick = () => {
    setStoreSelected(true);
    setTipSelected(false);
  };
  const handleTipclick = () => {
    setTipSelected(true);
    setStoreSelected(false);
  };

  const navigate = useNavigate();
  const handleRequest = () => {
    console.log('해주세요창 이동');
    navigate('/doit');
  };
  const handleCorkStore = () => {
    console.log('콜키지스토어창 이동');
    navigate('/corkScore');
  };
  const handleHotStore = () => {
    console.log('지금 핫한 매장 리스트 이동');
    navigate('/hotStores');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchCorkageList();
        console.log(res);
        setCorkage(res);
      } catch {
        console.error('API  호출 실패');
      }
    };
    fetchData();
  }, []);

  const [tiplist, setTiplist] = useState<TipList[]>();
  useEffect(() => {
    const fetchTipData = async () => {
      try {
        const res = await fetchTipList();
        console.log(res);
        console.log('imageUrl: ' + res[0].imageUrl);
        setTiplist(res);
      } catch {
        console.error('API  호출 실패');
      }
    };
    fetchTipData();
  }, []);

  //홈화면 가게 정보
  const [signature, setSignature] = useState<HomeRestaruantInfo>();
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchHomeRestaurant();
        if (!cancelled) setSignature(data);
        console.log('홈 화면 식당 정보 조회 성공');
      } catch (e) {
        console.error(e);
        console.log('홈 화면 식당 정보 조회 실패');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const goStore = () => {
    console.log('홈 대표 가게 상세 정보 페이지 이동');
    navigate(`/detailInfo/${signature?.restaurantId}`);
  };

  //tip 카테고리 상태
  const [selected, setSelected] = useState<Selected>('ALL');
  const filtered =
    selected === 'ALL' ? tiplist : tiplist?.filter((t) => t.tipCategory === selected);

  return (
    <div className="flex flex-col items-center">
      <TopBar searchDisabled={false} />
      <div className="relative mb-4">
        {/* <img
          src="http://t1.kakaocdn.net/fiy_reboot/place/C1B6E3FC902945369E993185518384E6"
          className="h-[200px] w-[361px] cursor-pointer rounded-lg object-cover"
          onClick={goStore}
        /> */}
        <img
          onClick={goStore}
          src={signature?.imageUrl ? signature.imageUrl : 'https://placehold.co/361x200'}
          className="h-[200px] w-[361px] cursor-pointer rounded-lg object-cover"
        />
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-black/40" />
        <div className="absolute left-4 top-4 z-10">
          <div className="flex flex-col gap-2">
            <div className="title">{signature?.restaurantName}</div>
            <div className="flex gap-2">
              <img src={keepIcon} />
              <div className="title">{signature?.bookmarkCount}</div>
            </div>
          </div>
        </div>
        <div
          onClick={handleHotStore}
          className="hotstore absolute bottom-4 left-4 bg-white bg-opacity-50"
        >
          <div className="flex gap-2">
            <img src={hotstore} />
            <button className="title text-[14px]">지금 핫한 매장</button>
          </div>
          <img src={arrow} className="h-[17px] w-[10px]" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={handleRequest}
            className="flex h-[80px] w-[176px] items-center justify-center rounded-[16px] bg-[#F3F3F6]"
          >
            <img src={smallGlass}></img>
            <div>해주세요</div>
          </button>
          <button
            onClick={handleCorkStore}
            className="flex h-[80px] w-[176px] items-center justify-center rounded-[16px] bg-[#F3F3F6]"
          >
            <img src={Glass}></img>
            <div>콜키지스코어</div>
          </button>
        </div>
        <div className="flex h-[30px] w-[393px] items-center justify-center gap-14 border-b">
          <button
            onClick={handleTipclick}
            className={`h-full w-[120px] border-x-0 border-b-2 border-t-0 border-solid ${tipSelected ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
          >
            Tip
          </button>
          <button
            onClick={handleStoreclick}
            className={`h-full w-[120px] border-x-0 border-b-2 border-t-0 border-solid ${storeSelected ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
          >
            매장
          </button>
        </div>
        {storeSelected ? (
          <>
            {corkages &&
              corkages.map((corkage) => {
                return (
                  <StoreCard
                    key={corkage.restaurantId}
                    restaurantId={corkage.restaurantId}
                    imageUrl={corkage.imageUrl}
                    keep={corkage.bookmarkCount}
                    price={corkage.corkagePrice}
                    name={corkage.name}
                    local={corkage.address}
                    rating={corkage.averageRating}
                    review={corkage.reviewCount}
                  />
                );
              })}
          </>
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
