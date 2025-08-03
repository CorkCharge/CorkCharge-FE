// import React from 'react'

import PairingInfo from './PairingInfo';

const PairingArticle = () => {
  return (
    <div className="mb-16 mt-4 h-auto w-[361px] rounded-b-lg shadow-2xl">
      <div className="flex h-[46px] items-center justify-center rounded-t-lg bg-gradient-to-r from-[#90212A]/65 to-[#DCDBE8] text-[18px] font-bold text-white">
        대표 메뉴 페어링
      </div>
      <div className="flex flex-col bg-white pt-4">
        <div className="mb-4 ml-4 mr-4">
          <div className="text-[30px] text-[#35353F]">엔비 햄버거</div>
          <div className="text-[33px] font-bold text-[#35353F]">대표메뉴 페어링</div>
        </div>
      </div>
      <PairingInfo />
      <PairingInfo />
      <PairingInfo />
      <PairingInfo />
    </div>
  );
};

export default PairingArticle;
