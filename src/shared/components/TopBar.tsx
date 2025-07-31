// import React from 'react'
import backarrow from '../assets/backarrow.svg';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ text }: { text: string }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="flex h-[48px] w-[393px] items-center justify-between">
      <img src={backarrow} onClick={handleClick} className="h-[20px] w-[12px] cursor-pointer" />
      <div className="font-bold text-[#35353F]">{text}</div>
      <div className="h-[20px] w-[12px]"></div>
    </div>
  );
};

export default TopBar;
