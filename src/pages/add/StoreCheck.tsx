import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import Back from '../../shared/assets/whiteArrow.svg';
import { enrollCorkage } from '@/shared/apis/user/user.api';
import Button from '@/shared/components/common/Button';

const StoreCheck = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const [stores, setStores] = useState([]);
  const [emblaIdx, setEmblaIdx] = useState(0);
  // const location = useLocation();
  // const { storeName, address, restaurantId, thumbnailUrl } = location.state || {
  //   storeName: '매장명 없음',
  //   address: '주소 없음',
  //   restaurantId: 'Id 없음',
  //   thumbnailUrl: '사진 미제공',
  // };

  useEffect(() => {
    getMasterStore();
  }, []);

  // 캐러셀 이동 시 callback (인덱스 설정)
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setEmblaIdx(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // 캐러셀 이동할 때마다 실행
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect); //재 초기화 시에도 이벤트 등록

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const getMasterStore = async () => {
    try {
      const res = await enrollCorkage();
      setStores(res);
    } catch (e) {
      console.error('사장님 콜키지 정보 등록 실패: ' + e);
    }
  };

  const handleRegisterClick = () => {
    // navigate('/add/option', {
    //   state: {
    //     storeName: storeName,
    //     address: address,
    //     restaurantId: restaurantId,
    //   },
    // });
  };

  const renderMasterStores = () => {
    // if (stores.length < 1) return;
    // const isActive = emblaIdx ===
    return (
      <div className="embla w-[80%]" style={{ maxWidth: 'calc(var(--app-width) * 0.7)' }}>
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex touch-pan-y touch-pinch-zoom">
            {[...Array(3)].map((_, idx) => {
              const isActive = emblaIdx === idx;
              return (
                <div
                  className={`embla__slide relative -ml-[25%] h-[65svh] w-full flex-[0_0_80%] rounded-bl-lg rounded-br-[70px] rounded-tl-[70px] rounded-tr-lg bg-white px-4 py-7 first:ml-0 ${isActive ? 'z-10' : 'z-5 scale-90 opacity-60'}`}
                >
                  <img
                    src="https://picsum.photos/200/178"
                    className="h-[50%] w-full rounded-bl-lg rounded-br-[70px] rounded-tl-[70px] rounded-tr-lg object-cover"
                  />
                  <div className="mt-5 flex flex-col gap-3 text-[var(--gray-8)]">
                    <span className="text-2xl font-bold">성수 누메르도스</span>
                    <span className="text-sm font-medium">서울 광진구 아차산로 21길 1 2층</span>
                  </div>
                  <Button
                    value="맞습니다"
                    className="absolute bottom-5 left-1/2 w-[60%] -translate-x-1/2 bg-[var(--primary)] text-white"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {[...Array(3)].map((_, idx) => (
            <span
              className={`size-1 rounded-full ${idx === emblaIdx ? 'bg-[var(--primary)]' : 'bg-[var(--gray-5)]'}`}
            ></span>
          ))}
        </div>
      </div>
    );
    // else if (stores.length === 1) {
    // } else {
    // }
  };

  return (
    <div
      className="h-svh px-4"
      style={{
        background:
          'linear-gradient(0deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.30) 100%), radial-gradient(215.29% 136.87% at -6.36% -7.63%, #90212A 0%, #DCDBE8 83.17%, #FFF 100%)',
      }}
    >
      {/* 헤더 영역 */}
      <div className="flex h-[48px] w-full items-center">
        <img
          src={Back}
          alt="왼쪽 화살표"
          className="h-[20.34px] w-[11.46px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="mx-auto font-bold text-white">추가하기</span>
      </div>

      <div className="mb-[26px] mt-[56px] text-center text-[24px] font-bold text-white">
        위 가게가 맞습니까?
      </div>

      <div className="-mx-4 flex justify-center">
        {renderMasterStores()}
        {/* <div
          className="flex h-[480px] w-[293px] flex-col items-center rounded-bl-[3%] rounded-br-[25%] rounded-tl-[25%] rounded-tr-[3%] bg-white/80"
          style={{
            boxShadow:
              '0px 4px 20px 0px rgba(58, 13, 16, 0.20), 0.318px 0.318px 2px 0px rgba(255, 255, 255, 0.30) inset',
          }}
        >
          <img
            src={''}
            alt="가게 썸네일"
            className="mt-[27px] h-[201px] w-[268px] rounded-bl-[3%] rounded-br-[25%] rounded-tl-[25%] rounded-tr-[3%]"
          />
          <div className="mt-[20px] flex w-full flex-col gap-[10px]">
            <div className={`ml-[26px] text-[24px] font-[700]`}>{'ss'}</div>
            <div className={`ml-[26px] text-[14px] font-[500] text-[#35353F]`}>{'ss'}</div>
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
    </div>
  );
};

export default StoreCheck;
