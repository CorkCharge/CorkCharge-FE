// import React from 'react';
import DetailHeader from '@/shared/components/detail/DetailHeader';
import DetailInfoSection from '@/shared/components/detail/DetailInfoSection';

const Info = () => {
  return (
    <div className="flex flex-col items-center bg-white">
      <DetailHeader
        name="앤비햄버거"
        rating={4.2}
        alias="광진구 햄버거 맛집"
        isOpen={true}
        time="4:00"
      />
      <DetailInfoSection />
    </div>
  );
};

export default Info;
