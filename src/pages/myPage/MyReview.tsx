import Header from '@/shared/components/common/Header';
import { StarRate } from '@/shared/components/myPage/StarRate';

import threeDots from '@/shared/assets/images/threedots.png';

function MyReview() {
  return (
    <div className="px-4">
      <Header type="back" title="리뷰관리" />
      <section className="flex flex-col gap-5 py-2">
        <div className="flex rounded-2xl bg-[var(--gray-1)]">
          <div className="relative grow basis-0 px-5 py-3">
            <h3 className="text-xl font-bold">엔비 햄버거</h3>
            <div className="mb-1 flex gap-2">
              {<StarRate rate={1.2} />}
              <span className="font-medium text-[var(--gray-8)]">4.2</span>
            </div>
            <p className="font-sm font-medium">
              몰트향과 완벽하게 어우러지는 조화로운 페어링입니다.
            </p>
            <span className="text-xs">2025.07.24</span>
            <div className="absolute right-2 top-3 flex items-center gap-2">
              <span className="rounded-xl bg-[rgba(218,203,182,0.3)] px-2 py-[6px] text-xs font-medium text-[var(--gray-8)]">
                저장 27
              </span>
              <img src={threeDots} className="h-[12px] w-[3px]" />
            </div>
          </div>
          <div className="max-w-[150px] basis-1/3 rounded-e-2xl bg-[skyblue]"></div>
        </div>

        <div className="flex rounded-2xl bg-[var(--gray-1)]">
          <div className="relative grow basis-0 px-5 py-3">
            <h3 className="text-xl font-bold">엔비 햄버거</h3>
            <div className="mb-1 flex gap-2">
              {<StarRate rate={2.7} />}
              <span className="font-medium text-[var(--gray-8)]">4.2</span>
            </div>
            <p className="font-sm font-medium">
              몰트향과 완벽하게 어우러지는 조화로운 페어링입니다.
            </p>
            <span className="text-xs">2025.07.24</span>
            <div className="absolute right-2 top-3 flex items-center gap-2">
              <span className="rounded-xl bg-[rgba(218,203,182,0.3)] px-2 py-[6px] text-xs font-medium text-[var(--gray-8)]">
                저장 27
              </span>
              <img src={threeDots} className="h-[12px] w-[3px]" />
            </div>
          </div>
          <div className="max-w-[150px] basis-1/3 rounded-e-2xl bg-[skyblue]"></div>
        </div>

        <div className="flex rounded-2xl bg-[var(--gray-1)]">
          <div className="relative grow basis-0 px-5 py-3">
            <h3 className="text-xl font-bold">엔비 햄버거</h3>
            <div className="mb-1 flex gap-2">
              {<StarRate rate={3.5} />}
              <span className="font-medium text-[var(--gray-8)]">4.2</span>
            </div>
            <p className="font-sm font-medium">
              몰트향과 완벽하게 어우러지는 조화로운 페어링입니다.
            </p>
            <span className="text-xs">2025.07.24</span>
            <div className="absolute right-2 top-3 flex items-center gap-2">
              <span className="rounded-xl bg-[rgba(218,203,182,0.3)] px-2 py-[6px] text-xs font-medium text-[var(--gray-8)]">
                저장 27
              </span>
              <img src={threeDots} className="h-[12px] w-[3px]" />
            </div>
          </div>
          <div className="max-w-[150px] basis-1/3 rounded-e-2xl bg-[skyblue]"></div>
        </div>
      </section>
    </div>
  );
}

export default MyReview;
