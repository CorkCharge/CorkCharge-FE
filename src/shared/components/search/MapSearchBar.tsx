// import React from 'react'
import Cork from '@/shared/assets/cork.svg';
import Search from '@/shared/assets/search.svg';
// import { useNavigate } from 'react-router-dom';

interface topBarProps {
  searchValue?: string;
  setSearchValue?: (value: string) => void;
}

const MapSearchBar = ({ searchValue, setSearchValue }: topBarProps) => {
  // const navigate = useNavigate();
  // const handleNotif = () => {
  //   console.log('알림창 이동');
  // navigate('/Notification'); //알림창 이동
  // };

  return (
    <div className="flex h-[60px] items-center justify-center gap-4 pl-4 pr-4">
      <img src={Cork}></img>
      <div className="flex h-[40px] w-[313px] items-center rounded-br-full rounded-tl-full bg-[#F3F3F6] pl-6 pr-6">
        <input
          type="text"
          value={searchValue}
          placeholder="코르크차지에서 콜키지 찾아보기"
          onChange={(e) => setSearchValue?.(e.target.value)}
          className="flex-1 bg-transparent text-gray-500 placeholder-gray-400 outline-none"
        />
        <img src={Search} className="cursor-pointer"></img>
      </div>
    </div>
  );
};

export default MapSearchBar;
