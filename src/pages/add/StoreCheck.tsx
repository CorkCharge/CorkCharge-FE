import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// import Back from '../../shared/assets/whiteArrow.svg';
// import Bg from '../doit/assets/request_bg.svg';
// import Placeholder from '../../shared/assets/placeholder.svg';
import Header from '@/shared/components/common/Header';
// import { useMasterStores } from '@/shared/queries/user/useMasterStores';

const StoreCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { storeName, address, restaurantId, thumb?nailUrl } = location.state || {
  //   storeName: '매장명 없음',
  //   address: '주소 없음',
  //   restaurantId: 'Id 없음',
  //   thumbnailUrl: '사진 미제공',
  // };

  // const { data: stores } = useMasterStores();

  useEffect(() => {
    console.log(location);
  }, [location]);
  // const handleBackClick = () => {
  //   navigate(-1);
  // };
  // const handleRegisterClick = () => {
  //   navigate('/add/option', {
  //     state: {
  //       storeName: storeName,
  //       address: address,
  //       restaurantId: restaurantId,
  //     },
  //   });
  // };

  return (
    <div className="px-4">
      <Header title="내 가게 목록" type="back" backFn={() => navigate(-1)} />
      {/*<div className="mt-[7vh] flex h-[48px] w-full flex-row items-center">
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="ml-[3vh] h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={handleBackClick}
        />
        <p className="mx-auto items-center text-[16px] font-[700] text-white">추가하기</p>
      </div>
      <div className="mb-[26px] mt-[56px] text-[24px] font-[700] text-white">
        위 가게가 맞습니까?
      </div>
      <div
        className="flex h-[480px] w-[293px] flex-col items-center rounded-bl-[3%] rounded-br-[25%] rounded-tl-[25%] rounded-tr-[3%] bg-white/80"
        style={{
          boxShadow:
            '0px 4px 20px 0px rgba(58, 13, 16, 0.20), 0.318px 0.318px 2px 0px rgba(255, 255, 255, 0.30) inset',
        }}
      >
        <img
          src={thumbnailUrl === `사진 미제공` ? Placeholder : thumbnailUrl}
          alt="가게 썸네일"
          className="mt-[27px] h-[201px] w-[268px] rounded-bl-[3%] rounded-br-[25%] rounded-tl-[25%] rounded-tr-[3%]"
        />
        <div className="mt-[20px] flex w-full flex-col gap-[10px]">
          <div className={`ml-[26px] text-[24px] font-[700]`}>{storeName}</div>
          <div className={`ml-[26px] text-[14px] font-[500] text-[#35353F]`}>{address}</div>
        </div>
        <div className="mt-[67px] flex flex-row gap-[6px]">
          <button
            onClick={handleRegisterClick}
            className="m-auto h-[48px] w-[246px] cursor-pointer items-center rounded-[12px] bg-[#90212A] font-[600] text-white"
          >
            맞습니다
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default StoreCheck;
