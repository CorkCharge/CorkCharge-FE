import { useState } from 'react';

import Header from '@/shared/components/common/Header';

function Notification() {
  const [isNotiOn, setIsNotiOn] = useState(false);
  const [isNightOn, setIsNightOn] = useState(false);
  return (
    <div className="px-4">
      <Header title="알림설정" type="back" />
      <div className="mt-5 flex flex-col gap-5">
        <div className="flex justify-between">
          <span className="font-bold text-[var(--gray-8)]">Push 알림 허용</span>
          <div
            className={`flex h-7 w-[50px] items-center rounded-2xl px-[3px] ${isNotiOn ? 'bg-[var(--primary)]' : 'bg-[var(--gray-3)]'}`}
            onClick={() => setIsNotiOn((prev) => !prev)}
          >
            <div
              className={`tansition-transform size-6 rounded-full bg-white duration-300 ${isNotiOn ? 'translate-x-[85%]' : 'translate-x-0'}`}
            ></div>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-[var(--gray-8)]">야간 알림 허용</span>
          <div
            className={`flex h-7 w-[50px] items-center rounded-2xl px-[3px] ${isNightOn ? 'bg-[var(--primary)]' : 'bg-[var(--gray-3)]'}`}
            onClick={() => setIsNightOn((prev) => !prev)}
          >
            <div
              className={`tansition-transform size-6 rounded-full bg-white duration-300 ${isNightOn ? 'translate-x-[85%]' : 'translate-x-0'}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
