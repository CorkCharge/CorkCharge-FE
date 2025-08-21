import Cork from '../../assets/cork.svg';
import Search from '../../assets/search.svg';
import { useNavigate } from 'react-router-dom';

interface topBarProps {
  searchDisabled: boolean;
  searchValue?: string;
  setSearchValue?: (value: string) => void;
}

const TopBar = ({ searchDisabled, searchValue, setSearchValue }: topBarProps) => {
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!searchDisabled) {
      navigate('/searchMap'); //검색창 이동
    }
  };

  return (
    <div className="mx-auto flex h-[60px] w-full items-center gap-4 pl-4 pr-4">
      <img src={Cork}></img>
      <div className="flex h-[40px] w-[100%] items-center rounded-br-full rounded-tl-full bg-white pl-6 pr-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.15)] filter">
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
    </div>
  );
};

export default TopBar;
