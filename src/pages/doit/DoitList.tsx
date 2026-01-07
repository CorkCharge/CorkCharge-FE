import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Button from '@/shared/components/common/Button';
import Modal from '@/shared/components/common/Modal';
import useRegionFilterStore from '@/shared/store/useRegionFilterStore';

import search from '@/shared/assets/images/search.png';
import arrow from '@/shared/assets/left_arrow.svg';
import downArrow from '@/shared/assets/selectArrow.svg';
import filterImg from '@/pages/corkagemap/filterImg.svg';

const DoitList = () => {
  const navigate = useNavigate();

  const [isDoitModalOpen, setIsDoitModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);

  const whichPage = useRegionFilterStore((state) => state.whichPage);
  const setSelectedDongNames = useRegionFilterStore((state) => state.setSelectedDongNames);
  const selectedDongNames = useRegionFilterStore((state) => state.selectedDongNames);
  const removeDongFromArray = useRegionFilterStore((state) => state.removeDongFromArray);

  useEffect(() => {
    if (whichPage !== 2) setSelectedDongNames([]);
  }, [whichPage, setSelectedDongNames]);

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
      onClick={() => navigate('/region-filter', { state: { from: 2 } })}
    >
      <path
        d="M0 18.5182V4.76239C0 4.42173 0.070673 4.12877 0.212019 3.88349C0.360096 3.63141 0.585577 3.4202 0.888462 3.24987L5.67404 0.470107C5.76154 0.415602 5.85577 0.364504 5.95673 0.316811C6.05769 0.262306 6.15192 0.214614 6.23943 0.173735V17.1078L1.99904 19.4277C1.68269 19.6049 1.4 19.6934 1.15096 19.6934C0.7875 19.6934 0.504808 19.5912 0.302884 19.3868C0.100962 19.1824 0 18.8929 0 18.5182ZM7.6226 16.9136V0C7.71683 0.0204394 7.81106 0.0510987 7.90529 0.0919777C8.00625 0.132857 8.10048 0.180548 8.18798 0.235053L13.1755 3.32141V20C13.1014 19.9796 13.024 19.9523 12.9432 19.9182C12.8692 19.8842 12.7919 19.8467 12.7111 19.8058L7.6226 16.9136ZM14.5485 19.9693V3.12724L19.001 0.623403C19.3173 0.446261 19.6 0.35769 19.8491 0.35769C20.2125 0.35769 20.4952 0.459888 20.6971 0.664282C20.899 0.868677 21 1.15823 21 1.53296V15.2989C21 15.6396 20.926 15.9359 20.7779 16.188C20.6365 16.4334 20.4144 16.6411 20.1116 16.8114L14.8515 19.8365C14.8043 19.8637 14.7538 19.8876 14.7 19.908C14.6529 19.9353 14.6024 19.9557 14.5485 19.9693Z"
        fill={selectedDongNames.length > 0 ? 'var(--primary)' : 'var(--gray-6)'}
      />
    </svg>
  );

  const getRightArrow = (isSelected: boolean) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="21"
      viewBox="0 0 12 21"
      fill="none"
      className="h-4 w-[10px]"
    >
      <path
        d="M11.4609 10.1718C11.4609 10.3203 11.4336 10.457 11.3789 10.582C11.3242 10.7148 11.2422 10.8359 11.1328 10.9453L1.83989 20.0391C1.62889 20.2422 1.37499 20.3437 1.07809 20.3437C0.874988 20.3437 0.695288 20.2969 0.539087 20.2031C0.374988 20.1094 0.246088 19.9805 0.152388 19.8164C0.050788 19.6602 -1.23223e-05 19.4805 -1.23045e-05 19.2773C-1.22793e-05 18.9883 0.105487 18.7344 0.316387 18.5156L8.84766 10.1718L0.316389 1.82814C0.105489 1.60934 -1.07378e-05 1.35544 -1.07125e-05 1.06644C-1.06947e-05 0.863236 0.0507896 0.683637 0.152389 0.527337C0.24609 0.363236 0.374989 0.234338 0.539089 0.140637C0.695289 0.0468378 0.874989 3.72215e-05 1.07809 3.72393e-05C1.37499 3.72652e-05 1.62889 0.105435 1.83989 0.316436L11.1328 9.39844C11.2422 9.50784 11.3242 9.62504 11.3789 9.75004C11.4336 9.88284 11.4609 10.0234 11.4609 10.1718Z"
        fill={isSelected ? 'white' : '#35353F'}
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
        fillOpacity="0.2"
      />
      <path
        d="M9.23877 10.4878C10.7244 11.9734 10.7244 14.3857 9.23877 15.8714L4.10981 21.0002C2.62414 19.5145 2.62414 17.1022 4.10981 15.6166L9.23877 10.4878Z"
        fill={selected ? 'white' : 'var(--gray-8)'}
      />
      <path
        d="M9.23877 10.4878C10.7244 11.9734 10.7244 14.3857 9.23877 15.8714L4.10981 21.0002C2.62414 19.5145 2.62414 17.1022 4.10981 15.6166L9.23877 10.4878Z"
        fill={selected ? 'white' : 'black'}
        fillOpacity="0.2"
      />
    </svg>
  );

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

  const renderStores = () =>
    [...Array(5)].map((_, idx) => (
      <div key={idx} onClick={() => setSelectedIdx(idx)} className="cursor-pointer">
        <div className="h-[172px] w-full rounded-t-2xl bg-black" />
        <div
          className="relative flex h-[44px] items-center rounded-b-2xl pl-6"
          style={{
            background:
              selectedIdx === idx
                ? 'linear-gradient(0deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 100%), radial-gradient(191.49% 164.27% at -1.8% 31%, #90212A 32.79%, #DCDBE8 65%)'
                : 'var(--glass)',
          }}
        >
          <div className="flex gap-3">
            {getLogo(selectedIdx === idx)}
            <span
              className={`text-sm font-bold ${selectedIdx === idx ? 'text-white' : 'text-[var(--gray-8)]'}`}
            >
              해주세요
            </span>
          </div>

          <div className="absolute right-4 flex cursor-pointer items-center gap-1">
            <span
              className={`text-sm font-medium ${selectedIdx === idx ? 'text-white' : 'text-[var(--gray-8)]'}`}
            >
              999+
            </span>
            {getRightArrow(selectedIdx === idx)}
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

        <div className="flex justify-center gap-1 px-5 pb-2">
          <div className="flex h-10 min-w-0 flex-1 items-center rounded-br-full rounded-tl-full bg-[var(--gray-1)] px-6">
            <input
              type="text"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium focus:outline-none"
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

      {/* <div
        className="relative flex items-center justify-center text-lg font-medium text-[var(--gray-8)]"
        style={{ height: 'calc(100svh - 16px - 96px - var(--footer-h))' }}
      >
        <p>매장정보가 존재하지 않습니다.</p>
        <p className="absolute bottom-0 text-[10px] text-[var(--gray-4)]">
          해주세요 서비스 신청은 매장 상세정보탭에서도 진행할 수 있습니다.
        </p>
      </div> */}

      {selectedDongNames.length < 1 ? (
        <Button
          value="해주세요"
          className="fixed left-1/2 mx-auto w-4/5 -translate-x-1/2 bg-[var(--primary)] text-white disabled:bg-[var(--gray-1)] disabled:text-[var(--gray-6)]"
          style={{
            maxWidth: 'calc(var(--app-width) * 0.8)',
            bottom: 'calc(var(--footer-h) + 15px)',
          }}
          disabled={selectedIdx === -1}
          onClick={() => setIsDoitModalOpen(true)}
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
          <button
            className="flex-[7] rounded-xl bg-[var(--primary)] font-bold text-white"
            onClick={() => navigate('/doit/request')}
          >
            원하는 비용 알려주기
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DoitList;
