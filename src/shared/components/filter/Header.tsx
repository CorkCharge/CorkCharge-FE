import { useNavigate } from 'react-router-dom';
import Back from '../../assets/left_arrow.svg';
import X from '../../../pages/doit/assets/x.svg';

const Header = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <header className="mt-[7vh] flex h-[48px] w-full flex-row place-content-between items-center">
      <img
        src={Back}
        alt="왼쪽 화살표"
        className="ml-[12px] h-[20.34px] w-[11.46px] cursor-pointer"
        onClick={handleBackClick}
      />
      <p className="text-[16px] font-[700]">필터</p>
      <img src={X} alt="x" className="mr-[12px] h-[17px] w-[17px]" />
    </header>
  );
};

export default Header;
