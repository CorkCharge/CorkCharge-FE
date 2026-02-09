import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ClipLoader } from 'react-spinners';

import Button from '@/shared/components/common/Button';
import Modal from '@/shared/components/common/Modal';
import useRegionFilterStore from '@/shared/store/useRegionFilterStore';
import type { DoitStoreResponse } from '@/shared/apis/helpRequest/helpRequest.type';
import Header from '@/shared/components/common/Header';
import { useDebounce } from '@/shared/hooks/useDebounce';

import search from '@/shared/assets/images/search.png';
import filterImg from '@/pages/corkagemap/filterImg.svg';
import { useDoitList } from '@/shared/queries/helprequest/useDoitList';
import { firstRequest } from '@/shared/apis/helpRequest/helpRequest.api';

const DoitList = () => {
  const navigate = useNavigate();

  const [isDoitModalOpen, setIsDoitModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlreadyModalOpen, setIsAlreadyModalOpen] = useState(false);

  const requiredStore = useRef<DoitStoreResponse>(null);

  const whichPage = useRegionFilterStore((state) => state.whichPage);
  const selectedDongNames = useRegionFilterStore((state) => state.selectedDongNames);
  const removeDongFromArray = useRegionFilterStore((state) => state.removeDongFromArray);
  const filteredRegions = useRegionFilterStore((state) => state.filteredRegions);
  const resetAddress = useRegionFilterStore((state) => state.resetAddress);

  useEffect(() => {
    if (whichPage !== 2) resetAddress();
  }, [whichPage, resetAddress]);

  // 검색어 디바운스
  const debounceQuery = useDebounce(searchQuery, 500);

  // 검색어 캐싱
  const sido = Object.keys(filteredRegions)[0];
  const sigungu = sido ? Object.keys(filteredRegions[sido] ?? {})[0] : undefined;
  const dong = sigungu ? filteredRegions[sido][sigungu] : undefined;
  const {
    data: stores,
    isLoading,
    isFetching,
  } = useDoitList({ sido, sigungu, dong, keyword: debounceQuery });

  const mapSvg = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        <path
          d="M0 12.9627V3.33367C0 3.09521 0.0471154 2.89014 0.141346 2.71844C0.240064 2.54198 0.390385 2.39414 0.592308 2.27491L3.78269 0.329075C3.84103 0.290922 3.90385 0.255153 3.97115 0.221768C4.03846 0.183614 4.10128 0.15023 4.15962 0.121615V11.9755L1.33269 13.5994C1.12179 13.7234 0.933333 13.7854 0.767309 13.7854C0.525 13.7854 0.336539 13.7138 0.201923 13.5708C0.067308 13.4277 0 13.225 0 12.9627ZM5.08173 11.8395V0C5.14455 0.0143076 5.20737 0.0357691 5.27019 0.0643844C5.3375 0.0929996 5.40032 0.126384 5.45866 0.164537L8.78367 2.32498V14C8.73428 13.9857 8.6827 13.9666 8.62883 13.9427C8.57949 13.9189 8.52791 13.8927 8.47404 13.8641L5.08173 11.8395ZM9.69903 13.9785V2.18907L12.6673 0.436382C12.8782 0.312383 13.0667 0.250383 13.2327 0.250383C13.475 0.250383 13.6635 0.321921 13.7981 0.464997C13.9327 0.608074 14 0.810762 14 1.07307V10.7093C14 10.9477 13.9507 11.1551 13.8519 11.3316C13.7577 11.5033 13.6096 11.6488 13.4077 11.768L9.90097 13.8855C9.86956 13.9046 9.8359 13.9213 9.8 13.9356C9.76858 13.9547 9.73493 13.969 9.69903 13.9785Z"
          fill="#35353F"
        />
        <path
          d="M0 12.9627V3.33367C0 3.09521 0.0471154 2.89014 0.141346 2.71844C0.240064 2.54198 0.390385 2.39414 0.592308 2.27491L3.78269 0.329075C3.84103 0.290922 3.90385 0.255153 3.97115 0.221768C4.03846 0.183614 4.10128 0.15023 4.15962 0.121615V11.9755L1.33269 13.5994C1.12179 13.7234 0.933333 13.7854 0.767309 13.7854C0.525 13.7854 0.336539 13.7138 0.201923 13.5708C0.067308 13.4277 0 13.225 0 12.9627ZM5.08173 11.8395V0C5.14455 0.0143076 5.20737 0.0357691 5.27019 0.0643844C5.3375 0.0929996 5.40032 0.126384 5.45866 0.164537L8.78367 2.32498V14C8.73428 13.9857 8.6827 13.9666 8.62883 13.9427C8.57949 13.9189 8.52791 13.8927 8.47404 13.8641L5.08173 11.8395ZM9.69903 13.9785V2.18907L12.6673 0.436382C12.8782 0.312383 13.0667 0.250383 13.2327 0.250383C13.475 0.250383 13.6635 0.321921 13.7981 0.464997C13.9327 0.608074 14 0.810762 14 1.07307V10.7093C14 10.9477 13.9507 11.1551 13.8519 11.3316C13.7577 11.5033 13.6096 11.6488 13.4077 11.768L9.90097 13.8855C9.86956 13.9046 9.8359 13.9213 9.8 13.9356C9.76858 13.9547 9.73493 13.969 9.69903 13.9785Z"
          fill="black"
          fillOpacity="0.2"
        />
      </g>
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

  const renderStores = () => {
    if (isLoading || isFetching)
      return (
        <div className="text-center">
          <ClipLoader color="var(--primary)" />
        </div>
      );

    if (!stores) return null;

    if (stores && stores.length === 0)
      return (
        <div
          className="relative flex items-center justify-center text-lg font-medium text-[var(--gray-8)]"
          style={{ height: 'calc(100svh - 16px - 96px - var(--footer-h))' }}
        >
          <p>매장정보가 존재하지 않습니다.</p>
          <p className="absolute bottom-0 text-[10px] text-[var(--gray-4)]">
            해주세요 서비스 신청은 매장 상세정보탭에서도 진행할 수 있습니다.
          </p>
        </div>
      );

    const handleSelect = (store: DoitStoreResponse) => {
      setSelectedIdx(store.restaurantId);
      requiredStore.current = store;
    };

    return stores.map((store: DoitStoreResponse) => (
      <div key={store.restaurantId} onClick={() => handleSelect(store)} className="cursor-pointer">
        {store.imageUrl ? (
          <img className="h-[172px] w-full rounded-t-2xl" src={store.imageUrl} />
        ) : (
          <div className="h-[172px] w-full rounded-t-2xl bg-black" />
        )}
        <div
          className="relative flex h-[44px] items-center rounded-b-2xl pl-6"
          style={{
            background:
              selectedIdx === store.restaurantId
                ? 'linear-gradient(0deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 100%), radial-gradient(191.49% 164.27% at -1.8% 31%, #90212A 32.79%, #DCDBE8 65%)'
                : 'var(--glass)',
          }}
        >
          <div className="flex gap-3">
            {getLogo(selectedIdx === store.restaurantId)}
            <span
              className={`text-sm font-bold ${selectedIdx === store.restaurantId ? 'text-white' : 'text-[var(--gray-8)]'}`}
            >
              해주세요
            </span>
          </div>

          <div className="absolute right-4 flex cursor-pointer items-center gap-1">
            <span
              className={`text-sm font-medium ${selectedIdx === store.restaurantId ? 'text-white' : 'text-[var(--gray-8)]'}`}
            >
              {store.requestCount > 999 ? '999+' : store.requestCount}
            </span>
            {getRightArrow(selectedIdx === store.restaurantId)}
          </div>
        </div>

        <div className="mt-1 text-[var(--gray-8)]">
          <span className="text-lg font-bold">{store.name}</span>
          <div className="font-medium">
            <span>{store.address}</span>
          </div>
          <span className="font-medium">{store.openingHoursText}</span>
        </div>
      </div>
    ));
  };

  const handleRequest = async () => {
    if (selectedIdx < 0) return;
    try {
      const res = await firstRequest(selectedIdx);
      if (res.code === 160000) {
        setIsAlreadyModalOpen(true);
      } else {
        setIsDoitModalOpen(true);
      }
    } catch (e) {
      console.error('해주세요 요청 실패: ' + e);
    }
  };

  return (
    <div>
      <div className="mb-4" style={{ boxShadow: '0 4px 7px 0px rgba(0,0,0,0.1)' }}>
        <Header title="해주세요" type="back" backFn={() => navigate('/home')} />

        <div className="flex justify-center gap-1 px-5 pb-2">
          <div className="flex h-10 min-w-0 flex-1 items-center rounded-br-full rounded-tl-full bg-[var(--gray-1)] px-6">
            <input
              type="text"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src={search} className="size-4 cursor-pointer" />
          </div>
          <div
            className="relative flex h-full shrink-0 cursor-pointer items-center rounded-2xl bg-[var(--gray-1)] px-3 py-2 text-sm font-medium text-[var(--gray-6)]"
            onClick={() => navigate('/region-filter', { state: { from: 2 } })}
          >
            {mapSvg}
            <span className="ml-1 py-1 text-center text-xs">지역필터</span>
          </div>
        </div>
      </div>

      <div className={`flex flex-col gap-4 px-4 ${stores?.length > 0 && 'mb-[80px]'}`}>
        {renderStores()}
      </div>

      {stores?.length > 0 &&
        (selectedDongNames.length < 1 ? (
          <Button
            value="해주세요"
            className="fixed left-1/2 mx-auto w-4/5 -translate-x-1/2 bg-[var(--primary)] text-white disabled:bg-[var(--gray-1)] disabled:text-[var(--gray-6)]"
            style={{
              maxWidth: 'calc(var(--app-width) * 0.8)',
              bottom: 'calc(var(--footer-h) + 15px)',
            }}
            disabled={selectedIdx === -1}
            // onClick={() => setIsDoitModalOpen(true)}
            onClick={handleRequest}
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
        ))}

      {/* 1차 요청 완료 모달 */}
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
            onClick={() =>
              navigate('/doit/request', {
                state: {
                  storeId: requiredStore.current?.restaurantId,
                  storeName: requiredStore.current?.name,
                  address: requiredStore.current?.address,
                },
              })
            }
          >
            원하는 비용 알려주기
          </button>
        </div>
      </Modal>

      {/* 이미 요청된 모달 */}
      <Modal isOpen={isAlreadyModalOpen}>
        <h3 className="text-center text-xl font-bold text-[var(--gray-8)]">
          이미 완료된 해주세요입니다.
        </h3>
        <p className="mb-5 mt-2 text-center font-medium text-[var(--gray-8)]">
          소중한 의견 감사합니다.
        </p>
        <Button
          value="닫기"
          className="bg-[var(--gray-1)] shadow-none"
          onClick={() => setIsAlreadyModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default DoitList;
