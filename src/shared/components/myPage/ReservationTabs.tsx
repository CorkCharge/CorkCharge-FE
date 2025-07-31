import sake from '@/shared/components/myPage/images/reservation-sake.png';
import arrow from '@/shared/assets/backarrow.svg';
import clock from '@/shared/assets/images/clock.png';

export const DrinkTab = () => {
  return (
    <div
      className="relative ml-6 mt-7 h-[830px] border-l border-[var(--gray-4)]"
      // style={{ height: 'calc(100vh - 48px - 38px - 28px)' }}
    >
      <div className="absolute top-0 flex -translate-x-[4px] -translate-y-1/2 items-center gap-[20px]">
        <div className="size-[8px] rounded-full bg-[var(--gray-4)]"></div>
        <span className="text-sm font-medium text-[var(--gray-5)]">2025년 5월</span>
      </div>

      <div className="absolute left-0 top-[25px] flex h-[66px] w-[55px] -translate-x-1/2 flex-col items-center justify-center rounded-lg border border-black bg-white text-xl font-bold">
        <span>25</span>
        <span className="text-[10px] font-medium leading-[15px] text-[var(--gray-5)]">SUN</span>
      </div>

      <div
        className="absolute left-[40px] top-[25px] flex flex-col gap-3 rounded-2xl bg-[var(--gray-1)] px-3 py-4"
        style={{ width: 'min(calc(100vw - 100px), 500px)' }}
      >
        <div className="flex">
          <img src={sake} className="size-14" />
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--gray-8)]">
              보시오 트로피칼 모스카토 망고
              <img src={arrow} className="h-3 w-[6px] rotate-180" />
            </p>
            <p className="text-sm font-medium text-[var(--gray-7)]">
              13,200원 <span className="text-[var(--gray-5)]">&middot; 1개</span>
            </p>
            <p className="mr-1 flex items-center">
              <span className="mr-2 flex items-center justify-center rounded-xl bg-[rgba(116,151,85,0.75)] px-2 py-[2px] text-[10px] font-medium text-white">
                파트너
              </span>
              <span className="mr-1 text-sm text-[var(--gray-7)]">골든라이언</span>
              <img src={arrow} className="h-3 w-[6px] rotate-180" />
            </p>
            <p className="flex items-center gap-1 text-sm text-[var(--gray-7)]">
              <img src={clock} className="size-3" />
              월-일 오후 1:00 ~ 오후 10:00
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-white p-3">
          <p className="mb-2 text-xs font-bold">
            <span className="mr-1 text-[#E75257]">배송 준비</span>
            <span className="text-[var(--gray-6)]">
              5/26(월) <span className="font-medium text-[var(--gray-6)]">도착 예정</span>
            </span>
          </p>
          <p className="text-[10px] font-medium text-[var(--gray-6)]">
            &middot; 준비 완료 알림을 받은 후 7일 내 픽업해주세요.
          </p>
          <p className="text-[10px] font-medium text-[var(--gray-6)]">
            &middot; 방문 시 신분증을 반드시 준비해주세요.
          </p>
        </div>
      </div>

      {/* ================ */}

      <div className="absolute left-0 top-[285px] flex h-[66px] w-[55px] -translate-x-1/2 flex-col items-center justify-center rounded-lg border border-black bg-white text-xl font-bold">
        <span>17</span>
        <span className="text-[10px] font-medium leading-[15px] text-[var(--gray-5)]">SAT</span>
      </div>

      <div
        className="absolute left-[40px] top-[285px] flex flex-col gap-3 rounded-2xl bg-[var(--gray-1)] px-3 py-4"
        style={{ width: 'min(calc(100vw - 100px), 500px)' }}
      >
        <div className="flex">
          <img src={sake} className="size-14" />
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--gray-8)]">
              보시오 트로피칼 모스카토 망고
              <img src={arrow} className="h-3 w-[6px] rotate-180" />
            </p>
            <p className="text-sm font-medium text-[var(--gray-7)]">
              13,200원 <span className="text-[var(--gray-5)]">&middot; 1개</span>
            </p>
            <p className="mr-1 flex items-center">
              <span className="mr-2 flex items-center justify-center rounded-xl bg-[rgba(116,151,85,0.75)] px-2 py-[2px] text-[10px] font-medium text-white">
                파트너
              </span>
              <span className="mr-1 text-sm text-[var(--gray-7)]">골든라이언</span>
              <img src={arrow} className="h-3 w-[6px] rotate-180" />
            </p>
            <p className="flex items-center gap-1 text-sm text-[var(--gray-7)]">
              <img src={clock} className="size-3" />
              월-일 오후 1:00 ~ 오후 10:00
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-white p-3">
          <p className="mb-2 text-xs font-bold">
            <span className="mr-1 text-[#E75257]">배송 준비</span>
            <span className="text-[var(--gray-6)]">
              5/26(월) <span className="font-medium text-[var(--gray-6)]">도착 예정</span>
            </span>
          </p>
          <p className="text-[10px] font-medium text-[var(--gray-6)]">
            &middot; 준비 완료 알림을 받은 후 7일 내 픽업해주세요.
          </p>
          <p className="text-[10px] font-medium text-[var(--gray-6)]">
            &middot; 방문 시 신분증을 반드시 준비해주세요.
          </p>
        </div>
      </div>

      {/* ============ */}

      <div className="absolute top-[545px] flex -translate-x-[4px] -translate-y-1/2 items-center gap-[20px]">
        <div className="size-[8px] rounded-full bg-[var(--gray-4)]"></div>
        <span className="text-sm font-medium text-[var(--gray-5)]">2025년 4월</span>
      </div>

      <div className="absolute left-0 top-[570px] flex h-[66px] w-[55px] -translate-x-1/2 flex-col items-center justify-center rounded-lg border border-black bg-white text-xl font-bold">
        <span>14</span>
        <span className="text-[10px] font-medium leading-[15px] text-[var(--gray-5)]">MON</span>
      </div>

      <div
        className="absolute left-[40px] top-[570px] flex flex-col gap-3 rounded-2xl bg-[var(--gray-1)] px-3 py-4"
        style={{ width: 'min(calc(100vw - 100px), 500px)' }}
      >
        <div className="flex">
          <img src={sake} className="size-14" />
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--gray-8)]">
              보시오 트로피칼 모스카토 망고
              <img src={arrow} className="h-3 w-[6px] rotate-180" />
            </p>
            <p className="text-sm font-medium text-[var(--gray-7)]">
              13,200원 <span className="text-[var(--gray-5)]">&middot; 1개</span>
            </p>
            <p className="mr-1 flex items-center">
              <span className="mr-2 flex items-center justify-center rounded-xl bg-[rgba(116,151,85,0.75)] px-2 py-[2px] text-[10px] font-medium text-white">
                파트너
              </span>
              <span className="mr-1 text-sm text-[var(--gray-7)]">골든라이언</span>
              <img src={arrow} className="h-3 w-[6px] rotate-180" />
            </p>
            <p className="flex items-center gap-1 text-sm text-[var(--gray-7)]">
              <img src={clock} className="size-3" />
              월-일 오후 1:00 ~ 오후 10:00
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-white p-3">
          <p className="mb-2 text-xs font-bold">
            <span className="mr-1 text-[#E75257]">배송 준비</span>
            <span className="text-[var(--gray-6)]">
              5/26(월) <span className="font-medium text-[var(--gray-6)]">도착 예정</span>
            </span>
          </p>
          <p className="text-[10px] font-medium text-[var(--gray-6)]">
            &middot; 준비 완료 알림을 받은 후 7일 내 픽업해주세요.
          </p>
          <p className="text-[10px] font-medium text-[var(--gray-6)]">
            &middot; 방문 시 신분증을 반드시 준비해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export const RestaurantTab = () => {
  return (
    <div
      className="relative ml-6 mt-7 h-[830px] border-l border-[var(--gray-4)]"
      // style={{ height: 'calc(100vh - 48px - 38px - 28px)' }}
    >
      <div className="absolute top-0 flex -translate-x-[4px] -translate-y-1/2 items-center gap-[20px]">
        <div className="size-[8px] rounded-full bg-[var(--gray-4)]"></div>
        <span className="text-sm font-medium text-[var(--gray-5)]">2025년 5월</span>
      </div>

      <div className="absolute left-0 top-[25px] flex h-[66px] w-[55px] -translate-x-1/2 flex-col items-center justify-center rounded-lg border border-black bg-white text-xl font-bold">
        <span>25</span>
        <span className="text-[10px] font-medium leading-[15px] text-[var(--gray-5)]">SUN</span>
      </div>

      <div
        className="absolute left-[40px] top-[25px] flex flex-col gap-3 rounded-2xl bg-[var(--gray-1)] px-3 py-4"
        style={{ width: 'min(calc(100vw - 100px), 500px)' }}
      >
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-sm font-bold text-[var(--gray-8)]">
            앤비 햄버거 - 건대점
            <img src={arrow} className="h-3 w-[6px] rotate-180" />
          </p>
          <p className="text-sm font-medium text-[var(--gray-7)]">서울 광진구 아차산로21길1 1층</p>
          <p className="mr-1 flex items-center text-sm font-medium text-[var(--gray-7)]">
            <span className="mr-2 flex items-center justify-center rounded-xl bg-[rgba(116,151,85,0.75)] px-2 py-[2px] text-[10px] font-medium text-white">
              4인
            </span>
            <img src={clock} className="mr-1 size-3" />
            오후 4:00 예약
          </p>
        </div>
      </div>

      {/* ============== */}

      <div className="absolute top-[160px] flex -translate-x-[4px] -translate-y-1/2 items-center gap-[20px]">
        <div className="size-[8px] rounded-full bg-[var(--gray-4)]"></div>
        <span className="text-sm font-medium text-[var(--gray-5)]">2025년 4월</span>
      </div>

      <div className="absolute left-0 top-[185px] flex h-[66px] w-[55px] -translate-x-1/2 flex-col items-center justify-center rounded-lg border border-black bg-white text-xl font-bold">
        <span>25</span>
        <span className="text-[10px] font-medium leading-[15px] text-[var(--gray-5)]">SUN</span>
      </div>

      <div
        className="absolute left-[40px] top-[185px] flex flex-col gap-3 rounded-2xl bg-[var(--gray-1)] px-3 py-4"
        style={{ width: 'min(calc(100vw - 100px), 500px)' }}
      >
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-sm font-bold text-[var(--gray-8)]">
            앤비 햄버거 - 건대점
            <img src={arrow} className="h-3 w-[6px] rotate-180" />
          </p>
          <p className="text-sm font-medium text-[var(--gray-7)]">서울 광진구 아차산로21길1 1층</p>
          <p className="mr-1 flex items-center text-sm font-medium text-[var(--gray-7)]">
            <span className="mr-2 flex items-center justify-center rounded-xl bg-[rgba(116,151,85,0.75)] px-2 py-[2px] text-[10px] font-medium text-white">
              4인
            </span>
            <img src={clock} className="mr-1 size-3" />
            오후 4:00 예약
          </p>
        </div>
      </div>
    </div>
  );
};
