import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Button from '@/shared/components/common/Button';

import search from '@/shared/assets/images/search.png';
import arrow from '@/shared/assets/left_arrow.svg';
import downArrow from '@/shared/assets/selectArrow.svg';
import rightArrow from '@/shared/assets/right_arrow.svg';
import Modal from '@/shared/components/common/Modal';

const DoitList = () => {
  const navigate = useNavigate();

  const [isLocalSet, setIsLocalSet] = useState(false);
  const [isDoitModalOpen, setIsDoitModalOpen] = useState(false);

  // const handleClick = () => {
  //   navigate('/doit/search');
  // };
  const mapSvg = (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={() => setIsLocalSet((prev) => !prev)}
    >
      <path
        d="M0 18.5182V4.76239C0 4.42173 0.070673 4.12877 0.212019 3.88349C0.360096 3.63141 0.585577 3.4202 0.888462 3.24987L5.67404 0.470107C5.76154 0.415602 5.85577 0.364504 5.95673 0.316811C6.05769 0.262306 6.15192 0.214614 6.23943 0.173735V17.1078L1.99904 19.4277C1.68269 19.6049 1.4 19.6934 1.15096 19.6934C0.7875 19.6934 0.504808 19.5912 0.302884 19.3868C0.100962 19.1824 0 18.8929 0 18.5182ZM7.6226 16.9136V0C7.71683 0.0204394 7.81106 0.0510987 7.90529 0.0919777C8.00625 0.132857 8.10048 0.180548 8.18798 0.235053L13.1755 3.32141V20C13.1014 19.9796 13.024 19.9523 12.9432 19.9182C12.8692 19.8842 12.7919 19.8467 12.7111 19.8058L7.6226 16.9136ZM14.5485 19.9693V3.12724L19.001 0.623403C19.3173 0.446261 19.6 0.35769 19.8491 0.35769C20.2125 0.35769 20.4952 0.459888 20.6971 0.664282C20.899 0.868677 21 1.15823 21 1.53296V15.2989C21 15.6396 20.926 15.9359 20.7779 16.188C20.6365 16.4334 20.4144 16.6411 20.1116 16.8114L14.8515 19.8365C14.8043 19.8637 14.7538 19.8876 14.7 19.908C14.6529 19.9353 14.6024 19.9557 14.5485 19.9693Z"
        fill={isLocalSet ? 'var(--primary)' : 'var(--gray-6)'}
      />
    </svg>
  );

  const getLogo = (selected: boolean) => (
    <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.6606 0C12.6858 2.02509 12.6858 5.31356 10.6606 7.33865L3.66952 14.3296C1.64437 12.3045 1.64437 9.016 3.66951 6.99092L10.6606 0Z"
        fill={selected ? 'white' : 'var(--gray-8)'}
      />
      <path
        d="M10.6606 0C12.6858 2.02509 12.6858 5.31356 10.6606 7.33865L3.66952 14.3296C1.64437 12.3045 1.64437 9.016 3.66951 6.99092L10.6606 0Z"
        fill={selected ? 'white' : 'black'}
        fill-opacity="0.2"
      />
      <path
        d="M9.23877 10.4878C10.7244 11.9734 10.7244 14.3857 9.23877 15.8714L4.10981 21.0002C2.62414 19.5145 2.62414 17.1022 4.10981 15.6166L9.23877 10.4878Z"
        fill={selected ? 'white' : 'var(--gray-8)'}
      />
      <path
        d="M9.23877 10.4878C10.7244 11.9734 10.7244 14.3857 9.23877 15.8714L4.10981 21.0002C2.62414 19.5145 2.62414 17.1022 4.10981 15.6166L9.23877 10.4878Z"
        fill={selected ? 'white' : 'black'}
        fill-opacity="0.2"
      />
    </svg>
  );

  const renderStores = () =>
    [...Array(5)].map(() => (
      <div>
        <div>
          <div className="h-[172px] w-full rounded-t-2xl bg-black" />
          <div className="relative flex h-[44px] items-center rounded-b-2xl bg-[var(--glass)] pl-6">
            <div className="flex gap-3">
              {getLogo(false)}
              <span className="text-[]var(--gray-8 text-sm font-bold">해주세요</span>
            </div>

            <div className="absolute right-4 flex cursor-pointer items-center gap-1">
              <span className="text-sm font-medium text-[var(--gray-8)]">999+</span>
              <img className="h-4 w-[10px]" src={rightArrow} />
            </div>
          </div>
        </div>

        <div className="mt-1 text-[var(--gray-8)]">
          <span className="text-lg font-bold">성수 누메르도스</span>
          <div className="font-medium">
            <span>1.2km</span>
            <span>서울시 성동구 상수동 340-2</span>
          </div>
          <span className="font-medium">평일 17:00~24:00</span>
        </div>
      </div>
    ));

  return (
    <div>
      <header className="mb-4" style={{ boxShadow: '0 4px 7px 0px rgba(0,0,0,0.1)' }}>
        <div className="flex h-[48px] items-center justify-between px-4 font-bold text-[var(--gray-8)]">
          <img src={arrow} className="cursor-pointer" onClick={() => navigate('/home')} />
          <span>해주세요</span>

          {mapSvg}
        </div>

        <div className="flex gap-1 pb-2 pl-8 pr-4">
          <div className="flex h-10 flex-1 items-center rounded-br-full rounded-tl-full bg-[var(--gray-1)] px-6">
            <input
              type="text"
              className="flex-1 bg-transparent text-sm font-medium focus:outline-none"
            />
            <img src={search} className="size-4 cursor-pointer" />
          </div>
          <div className="relative flex h-full shrink-0 items-center rounded-2xl bg-[var(--gray-1)] px-3 py-2 text-sm font-medium text-[var(--gray-6)]">
            <span className="py-1 text-center text-xs">요청 많은 순</span>
            <img
              src={downArrow}
              className="ml-2 cursor-pointer"
              // onClick={() => setIsDrop((prev) => !prev)}
            />
          </div>
        </div>
      </header>

      <div className="mb-[80px] flex flex-col gap-4 px-4">{renderStores()}</div>

      <Button
        value="해주세요"
        className="fixed left-1/2 mx-auto w-4/5 -translate-x-1/2 bg-[var(--primary)] text-white"
        style={{
          maxWidth: 'calc(var(--app-width) * 0.8)',
          bottom: 'calc(var(--footer-h) + 15px)',
        }}
        onClick={() => setIsDoitModalOpen(true)}
      />

      <Modal isOpen={isDoitModalOpen}>
        <h3 className="mb-2 text-center text-xl font-bold text-[var(--gray-8)]">해주세요 완료</h3>
        <p className="text-center text-sm">
          이 가게의 콜키지 비용은
          <br /> 얼마가 적당하다고 생각하시나요?
        </p>
        <div className="mt-4 flex h-12 gap-1">
          <button
            className="flex-[3] rounded-xl bg-[var(--gray-1)] font-bold text-[var(--gray-8)]"
            onClick={() => setIsDoitModalOpen(false)}
          >
            닫기
          </button>
          <button className="flex-[7] rounded-xl bg-[var(--primary)] font-bold text-white">
            원하는 비용 알려주기
          </button>
        </div>
      </Modal>
    </div>
    // <div className="relative flex min-h-screen flex-col items-center px-4">
    //   <Header type="back" title="" className="w-full bg-transparent" backFn={() => navigate(-1)} />
    //   <img
    //     src={Bg}
    //     alt="배경"
    //     className="absolute left-0 top-0 z-[-1] h-full w-full object-cover"
    //   />
    //   <div className="mt-[21.126vh] flex flex-col items-center">
    //     <img src={Logo} alt="로고" className="h-[77.265px] w-[52.727px]" />
    //     <img src={HandShake} alt="악수로고" className="-mt-[16px] h-[98.318px] w-[176.607px]" />
    //   </div>
    //   <div className="mt-[5.98vh] text-[20px] font-[700] text-white">해주세요 서비스란?</div>
    //   <div className="mt-[1.1737vh] flex flex-col items-center justify-center text-center text-[14px] font-[500] text-white">
    //     코르크 차지의 콜키지 추가 방식은 매장에 직접 방문하여
    //     <br />
    //     사장님과 함께 콜키지 비즈니스를 시작하는 방식입니다.
    //     <br />
    //     ‘해주세요 리스트’에 등록된 매장은 우선적으로 <br />
    //     콜키지 영업을 진행하게 됩니다.
    //   </div>
    //   <button
    //     className="absolute bottom-[15.638vh] flex h-[48px] w-[186.6px] flex-row items-center justify-center gap-[10px] rounded-[12px] bg-white/50"
    //     onClick={handleClick}
    //   >
    //     <p className="text-[17px] font-[600]">해주세요 하러가기</p>
    //     <img src={Arrow} alt=">" className="mt-[2.2px] h-[16px] w-[9.6px]" />
    //   </button>
    // </div>
  );
};

export default DoitList;
