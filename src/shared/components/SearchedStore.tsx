// import React from 'react'
// import { useNavigate } from 'react-router-dom';

interface storeProps {
  name: string;
  local: string;
  open: boolean;
  lastOrder: string;
  price: number; //0원이면 콜키지 프리
}

const SearchedStore = ({ name, local, open, lastOrder, price }: storeProps) => {
  //   const navigate = useNavigate();
  const goStore = () => {
    console.log('가게 상세 정보 페이지 이동');
    // navigate('/storeInfo');
  };
  return (
    <div
      onClick={goStore}
      className="mb-4 h-[128px] w-[361px] cursor-pointer rounded-xl bg-[#F3F3F6] pb-2 pl-4 pt-2"
    >
      <div className="flex flex-col gap-[1px] text-[14px]">
        <div className="mb-[4px] text-[20px] font-bold">{name}</div>
        <div>
          <div>{local}</div>
        </div>
        <span>
          <span>{open ? '영업중  ' : '영업종료  '}</span>
          <span className="ml-[10px]">{lastOrder} 라스트 오더</span>
        </span>
        <div>{price === 0 ? '콜키지 프리' : `병당 콜키지 ${price}원`}</div>
      </div>
    </div>
  );
};

export default SearchedStore;
