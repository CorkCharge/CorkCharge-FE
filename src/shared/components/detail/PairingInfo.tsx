// import React from 'react'

const PairingInfo = () => {
  return (
    <div>
      <div className="flex justify-between pl-0 pr-0">
        <div className="relative">
          <img src="https://placehold.co/173X260" />
          <div className="absolute bottom-4 left-4 w-[90px] text-[24px] font-bold text-white">
            라구버거
          </div>
        </div>
        <div className="relative">
          <img src="https://placehold.co/173X260" />
          <div className="absolute bottom-4 left-4 w-[90px] text-[24px] font-bold text-white">
            기네스 스타우트
          </div>
        </div>
      </div>
      <div className="mb-8 ml-4 mr-4 mt-4 text-[17px] text-[#585A68]">
        라구 햄버거의 진한 육즙과 풍미가 기네스 맥주의 깊고 부드러운 몰트향과 완벽하게 어우러지는
        조화로운 페어링입니다.
      </div>
    </div>
  );
};

export default PairingInfo;
