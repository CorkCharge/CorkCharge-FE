import { useNavigate } from 'react-router-dom';
import X from '../../../pages/doit/assets/x.svg';

const Header = () => {
  const navigate = useNavigate();

  const handleXClick = () => {
    navigate('/home');
  };

  return (
    <header className="relative mt-[1vh] flex h-[48px] w-full flex-row place-content-between items-center justify-center">
      <p className="text-[16px] font-[700]">필터</p>
      <img
        src={X}
        alt="x"
        className="absolute right-[12px] h-[17px] w-[17px] cursor-pointer"
        onClick={handleXClick}
      />
    </header>
  );
};

export default Header;
