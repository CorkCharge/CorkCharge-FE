import { useState } from 'react';

import Header from '@/shared/components/common/Header';

function Reservation() {
  const [isDrink, setIsDrink] = useState(true);

  return (
    <div className="px-4">
      <Header title="나의 예약" type="back" />
      <div className="-mx-4 border-b border-[var(--gray-2)]">
        <div className="mx-10 flex gap-5">
          <div
            className={`flex-1 py-2 text-center text-sm font-medium ${isDrink ? 'border-b border-[var(--gray-7)] text-[var(--gray-8)]' : 'text-[var(--gray-6)]'}`}
            onClick={() => setIsDrink(true)}
          >
            주류 예약
          </div>
          <div
            className={`flex-1 py-2 text-center text-sm font-medium ${!isDrink ? 'border-b border-[var(--gray-7)] text-[var(--gray-8)]' : 'text-[var(--gray-6)]'}`}
            onClick={() => setIsDrink(false)}
          >
            매장 예약
          </div>
        </div>
      </div>

      <div className="relative ml-6 mt-7 h-[500px] border-l border-[var(--gray-4)]">
        <div className="absolute left-0 flex h-[66px] w-[55px] -translate-x-1/2 flex-col items-center justify-center rounded-lg border border-black bg-white text-xl font-bold">
          <span>25</span>
          <span className="font-medium">SUN</span>
        </div>
      </div>

      {/* <div className="relative border-l-2 border-gray-300 pl-6">
        <div className="relative mb-10">
          <div className="absolute -left-[13px] top-0 h-6 w-6 rounded-full border-4 border-white bg-blue-500" />
          <p className="text-sm text-gray-500">2025.07.23</p>
          <h3 className="text-lg font-semibold">이벤트 제목</h3>
          <p className="text-gray-700">이벤트 상세 설명</p>
        </div>

        <div className="relative mb-10">
          <div className="absolute -left-[13px] top-0 h-6 w-6 rounded-full border-4 border-white bg-green-500" />
          <p className="text-sm text-gray-500">2025.07.24</p>
          <h3 className="text-lg font-semibold">다음 이벤트</h3>
          <p className="text-gray-700">여기에 세부 내용이 들어갑니다.</p>
        </div>
      </div> */}
    </div>
  );
}

export default Reservation;
