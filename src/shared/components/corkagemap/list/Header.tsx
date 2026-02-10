import { useNavigate } from 'react-router-dom';

import { cn } from '@/shared/utils/utils';

import Back from '../../../../shared/assets/left_arrow.svg';
import X from '../../../../pages/doit/assets/x.svg';

interface HeaderProps {
  title: string;
  className?: string;
  style?: React.CSSProperties;
}

const Header = ({ title, className, style }: HeaderProps) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div
      style={{ boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.10)', ...style }}
      className={cn(
        'fixed flex h-[48px] w-full flex-row place-content-between items-center bg-white',
        className
      )}
    >
      <div className="flex flex-row gap-[10px]">
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="ml-[13px] h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={handleBackClick}
        />
        <p className="font-500 text-[16px]">{title}</p>
      </div>
      <img src={X} alt="x" className="mr-[13px] h-[17px] w-[17px]" />
    </div>
  );
};

export default Header;
