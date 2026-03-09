import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import Back from '../../shared/assets/whiteArrow.svg';
import { enrollCorkage } from '@/shared/apis/user/user.api';
import Button from '@/shared/components/common/Button';
import type { EnrollCorkageResponse } from '@/shared/apis/user/user.type';

const StoreCheck = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: false,
  });

  const [stores, setStores] = useState<EnrollCorkageResponse[]>([]);
  const [emblaIdx, setEmblaIdx] = useState(0);

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

  const renderMasterStores = () => {
    return (
      <div className="embla w-[100%]">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex touch-pan-y touch-pinch-zoom">
            {stores.map((store, idx) => {
              const isActive = emblaIdx === idx;
              return (
                <div
                  key={store.restaurantId}
                  className={`embla__slide relative -ml-[25%] h-[65svh] flex-[0_0_80%] rounded-bl-lg rounded-br-[70px] rounded-tl-[70px] rounded-tr-lg bg-white px-4 py-7 first:ml-0 ${isActive ? 'z-10' : 'z-5 scale-90 opacity-60'}`}
                >
                  <img
                    src={store.mainImageUrl}
                    className="h-[50%] w-full rounded-bl-lg rounded-br-[70px] rounded-tl-[70px] rounded-tr-lg object-cover"
                  />
                  <div className="mt-5 flex flex-col gap-3 text-[var(--gray-8)]">
                    <span className="text-2xl font-bold">{store.restaurantName}</span>
                    <span className="text-sm font-medium">{store.address}</span>
                  </div>
                  <Button
                    value="맞습니다"
                    className="absolute bottom-5 left-1/2 w-[60%] -translate-x-1/2 bg-[var(--primary)] text-white"
                    onClick={() => navigate('/add/option', { state: { restaurant: store } })}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {stores.length > 1 && (
          <div className="mt-3 flex justify-center gap-2">
            {stores.map((_, idx) => (
              <span
                className={`size-1 rounded-full ${idx === emblaIdx ? 'bg-[var(--primary)]' : 'bg-[var(--gray-5)]'}`}
              ></span>
            ))}
          </div>
        )}
      </div>
    );
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

      <div className="-mx-4 flex justify-center">{renderMasterStores()}</div>
    </div>
  );
};

export default StoreCheck;
