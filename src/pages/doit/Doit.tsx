import HandShake from './handshake.svg';
import Logo from './logo_symbol.svg';
import Arrow from './right_arrow.svg';
import Back from '../../shared/assets/left_arrow.svg';
import Bg from './bg.svg';
const Doit = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <img
        src={Bg}
        alt="배경"
        className="absolute left-0 top-0 z-[-1] h-full w-full object-cover"
      />
      <img src={Back} alt="왼쪽 화살표" className="absolute left-[3vh] top-[7vh] cursor-pointer" />
      <div className="mt-[21.126vh] flex flex-col items-center">
        <img src={Logo} alt="로고" className="h-[77.265px] w-[52.727px]" />
        <img src={HandShake} alt="악수로고" className="-mt-[16px] h-[98.318px] w-[176.607px]" />
      </div>
      <div className="mt-[5.98vh] text-[20px] font-[700]">해주세요 서비스란?</div>
      <div className="mt-[1.1737vh] flex flex-col items-center justify-center text-center text-[14px] font-[500]">
        코르크 차지의 콜키지 추가 방식은 매장에 직접 방문하여
        <br />
        사장님과 함께 콜키지 비즈니스를 시작하는 방식입니다.
        <br />
        ‘해주세요 리스트’에 등록된 매장은 우선적으로 <br />
        콜키지 영업을 진행하게 됩니다.
      </div>
      <button className="absolute bottom-[28.638vh] flex h-[48px] w-[186.6px] flex-row items-center justify-center gap-[10px] rounded-[12px] bg-white/50">
        <p className="text-[17px] font-[600]">해주세요 하러가기</p>
        <img src={Arrow} alt=">" className="mt-[2.2px] h-[16px] w-[9.6px]" />
      </button>
    </div>
  );
};

export default Doit;
