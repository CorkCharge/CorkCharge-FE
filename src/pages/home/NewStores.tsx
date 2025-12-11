import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import Button from '@/shared/components/common/Button';
import useRegionFilterStore from '@/shared/store/useRegionFilterStore';

import star from '@/shared/assets/star.svg';
import share from '@/shared/assets/detailPageImgs/share.svg';
import keep from '@/pages/corkagemap/list/savemarker/SaveMarker3.svg';
import filterImg from '@/pages/corkagemap/filterImg.svg';

function NewStores() {
  const navigate = useNavigate();

  const selectedDongNames = useRegionFilterStore((state) => state.selectedDongNames);
  const removeDongFromArray = useRegionFilterStore((state) => state.removeDongFromArray);

  const renderNewStores = () =>
    [...Array(5)].map((_, idx) => (
      <div key={idx} className="flex flex-col gap-2">
        <div>
          <div className="h-[172px] rounded-t-2xl bg-black" />
          <div className="flex h-11 items-center justify-center rounded-b-2xl bg-[var(--glass)] text-sm font-bold text-[var(--gray-8)]">
            병당 콜키지: 1병 1만원
          </div>
        </div>
        <div className="relative">
          <span className="text-lg font-bold">성수 누메르도스</span>
          <p className="flex gap-1 font-medium">
            <span>1.2km</span>
            <span>서울시 성동구 상수동 340-2</span>
          </p>
          <span className="font-medium">평일 17:00 ~ 24:00</span>
          <div className="mt-1 flex font-medium text-[var(--gray-8)]">
            <img src={star} className="mr-1" />
            <span className="mr-2">4.2</span>
            <span>리뷰 total 3,124</span>
          </div>
          <div className="absolute bottom-0 right-0 flex items-center gap-1">
            <div className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-white">
              <img src={keep} className="size-6" />
            </div>
            <span className="text-sm font-medium text-[var(--gray-8)]">99+</span>
            <div className="relative flex size-6 cursor-pointer rounded-full bg-white">
              <img
                src={share}
                className="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-[40%]"
              />
            </div>
          </div>
        </div>
      </div>
    ));

  const renderDongs = () =>
    selectedDongNames.map((dong: string, idx: number) => (
      <div
        className="flex h-[32px] items-center gap-1 rounded-lg bg-[#90214626] px-2 py-1 text-[12px] font-semibold text-[#90212A]"
        key={idx}
      >
        <span>{dong}</span>
        <button onClick={() => removeDongFromArray(dong)}>✕</button>
      </div>
    ));

  return (
    <div className="relative px-4">
      <Header title="신규매장등록" type="back" backFn={() => navigate('/home')} />
      <div className="mb-[200px] flex flex-col gap-6">{renderNewStores()}</div>
      {selectedDongNames.length < 1 ? (
        <Button
          value="지역 검색"
          className="fixed left-1/2 mx-auto -translate-x-1/2 bg-[var(--primary)] text-white"
          style={{
            maxWidth: 'calc(var(--app-width) * 0.8)',
            bottom: 'calc(var(--footer-h) + 15px)',
          }}
          onClick={() => navigate('/region-filter')}
        />
      ) : (
        <div
          className="fixed left-1/2 h-[150px] w-full -translate-x-1/2 bg-white px-4 py-2"
          style={{ maxWidth: 'var(--app-width)', bottom: 'var(--footer-h)' }}
        >
          <div className="flex items-center gap-2">
            <img src={filterImg} className="size-6" />
            <span className="text-xs font-semibold">
              <span className="text-[var(--primary)]">{selectedDongNames.length}</span>/10
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">{renderDongs()}</div>
        </div>
      )}
    </div>
  );
}

export default NewStores;
