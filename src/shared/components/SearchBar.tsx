import { useNavigate } from 'react-router-dom';

import { cn } from '../utils/utils';

import Cork from '../assets/cork.svg';
import Search from '../assets/search.svg';

interface topBarProps {
  searchDisabled: boolean;
  searchValue?: string;
  className?: string;
}

const SearchBar = ({ searchDisabled, className }: topBarProps) => {
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchDisabled) {
      console.log('검색허용');
    } else {
      console.log('검색창 이동');
      navigate('/searchMap'); //검색창 이동
    }
  };

  return (
    <div className={cn('flex h-[60px] w-full items-center gap-4', className)}>
      <img src={Cork}></img>
      <div className="flex h-[40px] flex-1 items-center rounded-br-full rounded-tl-full bg-[#F3F3F6] pl-6 pr-6">
        <div
          onClick={handleSearch}
          className="flex-1 cursor-pointer bg-transparent text-sm font-medium text-gray-400 outline-none"
        >
          코르크차지에서 콜키지 찾아보기
        </div>
        <img src={Search} onClick={handleSearch} className="cursor-pointer"></img>
      </div>
    </div>
  );
};

export default SearchBar;
