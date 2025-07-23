import { useState } from 'react';

import hello from '@/shared/components/myPage/images/hello.png';

function ChooseRole() {
  const GRADIENT_BG =
    'linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), radial-gradient(144.85% 146.88% at -4.43% 75%, #90212A 5.69%, #DCDBE8 86.4%)';

  const [role, setRole] = useState(-1); // 손님: 0, 사장님: 1
  return (
    <main className="px-4 pt-[10vh]">
      <img src={hello} className="size-[120px]" />
      <p className="text-2xl font-bold">이정빈님 반가워요!</p>
      <div className="mt-10 flex flex-col gap-5">
        <div
          className="flex h-[88px] items-center justify-between rounded-2xl bg-[var(--gray-1)] px-4"
          style={{ background: role === 0 ? GRADIENT_BG : 'var(--gray-1)' }}
          onClick={() => setRole(0)}
        >
          <p className={`text-xl font-bold ${role === 0 && 'text-white'}`}>손님으로 시작하기</p>
          <div
            className={`flex size-6 items-center justify-center rounded-full border ${role === 0 ? 'border-white' : 'border-[var(--gray-4)]'}`}
          >
            {role === 0 && <div className="size-4 rounded-full bg-white"></div>}
          </div>
        </div>

        <div
          className="flex h-[88px] items-center justify-between rounded-2xl bg-top px-4"
          style={{ background: role === 1 ? GRADIENT_BG : 'var(--gray-1)' }}
          onClick={() => setRole(1)}
        >
          <p className={`text-xl font-bold ${role === 1 && 'text-white'}`}>사장님으로 시작하기</p>
          <div
            className={`flex size-6 items-center justify-center rounded-full border ${role === 1 ? 'border-white' : 'border-[var(--gray-4)]'}`}
          >
            {role === 1 && <div className="size-4 rounded-full bg-white"></div>}
          </div>
        </div>
      </div>

      {role !== -1 && (
        <button className="fixed bottom-4 left-[10%] right-[10%] mx-auto h-[48px] w-[80%] max-w-[480px] rounded-[10px] bg-[var(--primary)] font-bold text-white">
          다음
        </button>
      )}
    </main>
  );
}

export default ChooseRole;
