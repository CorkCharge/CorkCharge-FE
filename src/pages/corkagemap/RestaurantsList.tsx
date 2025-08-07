import { useNavigate } from 'react-router-dom';
import Back from '../../shared/assets/left_arrow.svg';
import X from '../doit/assets/x.svg';

const RestaurantsList = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <div
        style={{ boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.10)' }}
        className="mt-[7vh] flex h-[48px] w-full flex-row place-content-between items-center"
      >
        <div className="flex flex-row gap-[10px]">
          <img
            src={Back}
            alt="왼쪽 화살표"
            className="ml-[13px] h-[20.34px] w-[11.46px] cursor-pointer"
            onClick={handleBackClick}
          />
          <p className="font-500 text-[16px]">화양동</p>
        </div>
        <img src={X} alt="x" className="mr-[13px] h-[17px] w-[17px]" />
      </div>
    </div>
  );
};

export default RestaurantsList;
