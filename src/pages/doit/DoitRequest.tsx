import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Slider from 'rc-slider';

import { secondRequest } from '@/shared/apis/helpRequest/helpRequest.api';
import { type CorkageTypeKr, type Priority } from '@/shared/apis/helpRequest/helpRequest.type';

import arrow from '@/shared/assets/whiteArrow.svg';

type RestaurantData = {
  storeId: number;
  storeName: string;
  address: string;
};
// type Priority = 'extraGlass' | 'ice' | 'decanting' | null;

function DoitRequest() {
  const navigate = useNavigate();
  const location = useLocation();

  const { storeId, storeName, address } = (location.state as RestaurantData) ?? {};

  const [corkageType, setCorkageType] = useState<CorkageTypeKr>('테이블당');
  const [sliderVal, setSliderVal] = useState(1000);
  const [firstPriority, setFirstPriority] = useState<Priority>();
  const [secondPriority, setSecondPriority] = useState<Priority>();
  const [content, setContent] = useState('');

  const renderPriorityButtons = (
    pri: Priority,
    setPri: (_: Priority) => void,
    disabledOption?: Priority
  ) => (
    <div className="flex gap-1">
      <button
        className={`rounded-3xl border border-solid px-4 py-[6px] font-medium disabled:bg-[var(--gray-3)] ${pri === 'extraGlass' ? 'border-[var(--primary)] bg-[rgba(144,33,70,0.15)] text-[var(--primary)]' : 'border-[var(--gray-3)] text-[var(--gray-6)]'}`}
        onClick={() => setPri('extraGlass')}
        disabled={disabledOption === 'extraGlass'}
      >
        잔 제공
      </button>
      <button
        className={`rounded-3xl border border-solid px-4 py-[6px] font-medium disabled:bg-[var(--gray-3)] ${pri === 'ice' ? 'border-[var(--primary)] bg-[rgba(144,33,70,0.15)] text-[var(--primary)]' : 'border-[var(--gray-3)] text-[var(--gray-6)]'}`}
        onClick={() => setPri('ice')}
        disabled={disabledOption === 'ice'}
      >
        얼음
      </button>
      <button
        className={`rounded-3xl border border-solid px-4 py-[6px] font-medium disabled:bg-[var(--gray-3)] ${pri === 'decanting' ? 'border-[var(--primary)] bg-[rgba(144,33,70,0.15)] text-[var(--primary)]' : 'border-[var(--gray-3)] text-[var(--gray-6)]'}`}
        onClick={() => setPri('decanting')}
        disabled={disabledOption === 'decanting'}
      >
        디캔팅
      </button>
    </div>
  );

  // 2차 해주세요 제출
  const handleSubmit = async () => {
    if (!storeId) {
      console.error('storeId가 없습니다.');
      return;
    }
    if (!firstPriority || !secondPriority) return;

    try {
      await secondRequest(storeId, corkageType, sliderVal, firstPriority, secondPriority, content);
      navigate('/doit/complete');
    } catch (e) {
      console.error('2차 해주세요 요청 실패: ' + e);
    }
  };

  return (
    <div
      className="px-4 pb-10"
      style={{
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%), radial-gradient(215.29% 136.87% at -6.36% -7.63%, #90212A 0%, #DCDBE8 83.17%, #FFF 100%)',
        minHeight: 'calc(100svh - var(--footer-h))',
      }}
    >
      {/* 헤더 */}
      <div className="relative flex h-12 items-center justify-center text-center font-bold text-white">
        해주세요
        <img src={arrow} className="absolute left-0 cursor-pointer" onClick={() => navigate(-1)} />
      </div>

      {/* 가게 정보 */}
      <div className="mb-2 mt-4 px-1 text-white">
        <h3 className="text-3xl font-bold text-white">{storeName}</h3>
        <p className="mt-2 text-sm font-medium">{address}</p>
      </div>

      {/* 콜키지 요청 본문 */}
      <div className="rounded-bl-lg rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-white p-4">
        <p className="mb-1 text-lg text-[var(--gray-8)]">선호하는 콜키지 유형</p>
        <div className="flex gap-2">
          <button
            className={`h-12 flex-[2] rounded-xl py-3 font-semibold ${corkageType === '테이블당' ? 'bg-[var(--primary)] text-white' : 'bg-white text-[var(--primary)]'}`}
            onClick={() => setCorkageType('테이블당')}
            style={{
              boxShadow: '0 0 0.9px 0 rgba(66, 71, 76, 0.32), 0 4px 8px 0 rgba(66, 71, 76, 0.05)',
            }}
          >
            테이블당
          </button>
          <button
            className={`h-12 flex-1 rounded-xl py-3 font-semibold ${corkageType === '인당' ? 'bg-[var(--primary)] text-white' : 'bg-white text-[var(--primary)]'}`}
            onClick={() => setCorkageType('인당')}
            style={{
              boxShadow: '0 0 0.9px 0 rgba(66, 71, 76, 0.32), 0 4px 8px 0 rgba(66, 71, 76, 0.05)',
            }}
          >
            인당
          </button>
          <button
            className={`h-12 flex-1 rounded-xl py-3 font-semibold ${corkageType === '병당' ? 'bg-[var(--primary)] text-white' : 'bg-white text-[var(--primary)]'}`}
            onClick={() => setCorkageType('병당')}
            style={{
              boxShadow: '0 0 0.9px 0 rgba(66, 71, 76, 0.32), 0 4px 8px 0 rgba(66, 71, 76, 0.05)',
            }}
          >
            병당
          </button>
        </div>

        <p className="mt-4 text-[10px] text-[var(--gray-6)]">
          {storeName}의 평균 선호 비용은 5000원이에요!
        </p>

        <div className="relative">
          <span className="absolute -top-1 left-[13.8%] -translate-x-1/2 -translate-y-1/2 text-[var(--primary)]">
            ▼
          </span>
          <Slider
            className="mt-3"
            step={1000}
            min={1000}
            max={30000}
            value={sliderVal}
            onChange={(val) => typeof val === 'number' && setSliderVal(val)}
            styles={{
              rail: {
                background: 'rgba(120, 120, 128, 0.16)',
              },
              track: {
                background: 'var(--primary)',
              },
              handle: {
                background: 'white',
                border: '3px solid var(--primary)',
                opacity: '1',
                width: '28px',
                height: '28px',
                marginTop: -12,
                boxShadow: 'none',
              },
            }}
          />
          <div className="mt-1 flex justify-between text-sm text-[var(--gray-6)]">
            <span>1,000원</span>
            <span>30,000원 이상</span>
          </div>
        </div>

        <div className="mt-4 flex gap-5 font-medium text-[var(--primary)]">
          <span className="flex-1 rounded-br-3xl rounded-tl-3xl bg-[var(--gray-1)] px-4 py-2 text-center">
            {corkageType}
          </span>
          <span className="flex-1 rounded-br-3xl rounded-tl-3xl bg-[var(--gray-1)] px-4 py-2 text-center">
            {sliderVal.toLocaleString()}원
          </span>
        </div>

        <div className="mt-10">
          <h3 className="mb-2 text-lg font-medium text-[var(--gray-8)]">기타 서비스 우선순위</h3>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-medium text-[var(--gray-8)]">1순위</span>
            <>{renderPriorityButtons(firstPriority!, setFirstPriority, secondPriority)}</>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[var(--gray-8)]">2순위</span>
            <>{renderPriorityButtons(secondPriority!, setSecondPriority, firstPriority)}</>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="mb-1 font-medium text-[var(--gray-8)]">추가 요청 사항 (선택)</h3>
          <div className="rounded-br-3xl rounded-tl-3xl bg-[var(--gray-1)] p-4">
            <textarea
              className="min-h-[230px] w-full resize-none bg-transparent placeholder:text-[var(--gray-5)] focus:outline-none"
              placeholder="원하는 콜키지 가격이나 옵션을 작성해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mt-5 flex gap-4 font-semibold">
            <button
              className="h-12 flex-1 rounded-xl bg-[var(--gray-1)] text-[var(--gray-6)]"
              onClick={() => navigate(-1)}
            >
              취소
            </button>
            <button
              className="h-12 flex-1 rounded-xl bg-[var(--primary)] text-white"
              onClick={handleSubmit}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoitRequest;
