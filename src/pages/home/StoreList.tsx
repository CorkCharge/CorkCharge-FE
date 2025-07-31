// import React from 'react';
import StoreCard from '../../shared/components/StoreCard';
import Curation from '../../shared/components/Curation';
import Tip from '../../shared/components/Tip';
import TopBar from '../../shared/components/SearchBar';
import Glass from '../../shared/assets/glass.svg';
import smallGlass from '../../shared/assets/smallGlass.svg';
import arrow from '../../shared/assets/arrow.svg';
import hotstore from '../../shared/assets/hotstore.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import keepIcon from '../../shared/assets/keep.svg';

const StoreList = () => {
  const [storeSelected, setStoreSelected] = useState<boolean>(true);
  const [tipSelected, setTipSelected] = useState<boolean>(false);
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
    // navigate('/request');
  };
  const handleCorkStore = () => {
    console.log('콜키지스토어창 이동');
    // navigate('/CorkStore');
  };
  const handleHotStore = () => {
    console.log('지금 핫한 매장 리스트 이동');
    navigate('/hotStores');
  };

  return (
    //Todo: TopBar fixed 주기
    <div className="flex flex-col items-center">
      <TopBar searchDisabled={false} />
      <div className="relative mb-4">
        <img src="https://placehold.co/361x200" className="rounded-lg" />
        <div className="absolute left-4 top-4">
          <div className="flex flex-col gap-2">
            <div className="title">성수 누메로도스</div>
            <div className="flex gap-2">
              <img src={keepIcon} />
              <div className="title">198</div>
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
            <img src={Glass}></img>
            <div>해주세요</div>
          </button>
          <button
            onClick={handleCorkStore}
            className="flex h-[80px] w-[176px] items-center justify-center rounded-[16px] bg-[#F3F3F6]"
          >
            <img src={smallGlass}></img>
            <div>콜키지스코어</div>
          </button>
        </div>
        <div className="flex h-[30px] w-[393px] items-center justify-center gap-14 border-b">
          <button
            onClick={handleStoreclick}
            className={`h-full w-[120px] border-x-0 border-b-2 border-t-0 border-solid ${storeSelected ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
          >
            매장
          </button>
          <button
            onClick={handleTipclick}
            className={`h-full w-[120px] border-x-0 border-b-2 border-t-0 border-solid ${tipSelected ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
          >
            Tip
          </button>
        </div>
        {storeSelected ? (
          <>
            <StoreCard
              keep={88}
              price={1}
              name="깍뚝"
              local="500m 서울 광진구 어대로 1층"
              time="평일 17:00~24:00"
              rating={4.2}
              review={3124}
            />
            <StoreCard
              keep={51}
              price={1}
              name="엔비 햄버거"
              local="1.2km 서울시 상동구 상수동 340-2"
              time="평일 17:00~24:00"
              rating={4.2}
              review={3124}
            />
          </>
        ) : (
          <>
            <Tip />
            <Curation />
          </>
        )}
      </div>
    </div>
  );
};

export default StoreList;
