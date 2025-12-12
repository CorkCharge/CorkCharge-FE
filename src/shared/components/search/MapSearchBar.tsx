import Cork from '@/shared/assets/cork.svg';
import Search from '@/shared/assets/search.svg';

interface topBarProps {
  searchValue?: string;
  setSearchValue?: (value: string) => void;
  directSearch?: (value: string) => void;
}

const MapSearchBar = ({ searchValue, setSearchValue, directSearch }: topBarProps) => {
  return (
    <div className="flex h-[60px] w-full items-center justify-center gap-4 pl-4">
      <img src={Cork} alt="Cork logo" />
      <div className="flex h-[40px] w-full items-center rounded-br-full rounded-tl-full bg-[var(--gray-1)] pl-6 pr-6">
        <input
          type="text"
          value={searchValue}
          placeholder="코르크차지에서 콜키지 찾아보기"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              directSearch?.(searchValue || '');
            }
          }}
          onChange={(e) => {
            setSearchValue?.(e.target.value);
          }}
          className="flex-1 bg-transparent text-black outline-none placeholder:text-[var(--gray-5)]"
        />
        <img
          src={Search}
          alt="Search"
          className="cursor-pointer"
          onClick={() => directSearch?.(searchValue || '')}
        />
      </div>
    </div>
  );
};

export default MapSearchBar;
