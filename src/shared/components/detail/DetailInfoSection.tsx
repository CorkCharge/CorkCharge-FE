// import React from 'react'
import { useState } from 'react';
import DetailInfo from './DetailInfo';
import StoreInfo from './StoreInfo';

const DetailInfoSection = () => {
  const [corkSelected, setCorkSelected] = useState<boolean>(true);
  const [storeSelected, setStoreSelected] = useState<boolean>(false);
  const handleCorkclick = () => {
    setCorkSelected(true);
    setStoreSelected(false);
  };
  const handleStoreclick = () => {
    setStoreSelected(true);
    setCorkSelected(false);
  };
  return (
    <div>
      <div className="flex h-[40px] w-[393px] items-center justify-center gap-14 border-b text-[14px]">
        <button
          onClick={handleCorkclick}
          className={`border-b-1 h-full w-[120px] border-x-0 border-t-0 border-solid ${corkSelected ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
        >
          콜키지
        </button>
        <button
          onClick={handleStoreclick}
          className={`h-full w-[120px] border-x-0 border-b-2 border-t-0 border-solid ${storeSelected ? 'border-b-black text-black' : 'border-b-transparent text-gray-300'}`}
        >
          매장
        </button>
      </div>
      {corkSelected ? (
        <>
          <DetailInfo
            price="병당 1만원"
            //info 여러줄?(배열형태로?)
            info="잔 제공 얼음 제공 한병 무료"
          />
        </>
      ) : (
        <>
          <StoreInfo />
        </>
      )}
    </div>
  );
};

export default DetailInfoSection;
