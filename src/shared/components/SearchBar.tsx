// import React from 'react'
import Cork from '../assets/cork.svg';
import Search from '../assets/search.svg';
import Bell from '../assets/bell.svg';
import { useNavigate } from 'react-router-dom';

interface topBarProps {
  searchDisabled: boolean;
  searchValue?: string;
  setSearchValue?: (value: string) => void;
}

const TopBar = ({ searchDisabled, searchValue, setSearchValue }: topBarProps) => {
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchDisabled) {
      console.log('검색허용');
      //   onchange = (e) => {
      //     setSearchValue(e.target.value);
      //   };
    } else {
      console.log('검색창 이동');
      navigate('/search'); //검색창 이동
    }
  };
  const handleNotif = () => {
    console.log('알림창 이동');
    // navigate('/Notification'); //알림창 이동
  };

  return (
    <div className="flex h-[60px] items-center gap-4 pl-4 pr-4">
      <img src={Cork}></img>
      <div className="flex h-[40px] w-[290px] items-center rounded-br-full rounded-tl-full bg-[#F3F3F6] pl-6 pr-6">
        <input
          type="text"
          value={searchValue}
          placeholder="코르크차지에서 콜키지 찾아보기"
          onClick={handleSearch}
          onChange={(e) => setSearchValue?.(e.target.value)}
          className="flex-1 bg-transparent text-gray-500 placeholder-gray-400 outline-none"
        />
        <img src={Search} onClick={handleSearch} className="cursor-pointer"></img>
      </div>
      <img src={Bell} onClick={handleNotif} className="cursor-pointer"></img>
    </div>
  );
};

export default TopBar;
