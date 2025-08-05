import { useState } from 'react';

import Header from '@/shared/components/common/Header';
import { StarRate } from '@/shared/components/myPage/StarRate';
import { ModifyModal, DeleteModal, ShareModal } from '@/shared/components/myPage/ReviewModals';

import threeDots from '@/shared/assets/images/threedots.png';

function MyReview() {
  const [isOpen, setIsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

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
              <img src={threeDots} className="h-[12px] w-[3px]" onClick={openMenu} />
              <ul
                className={`${!isOpen && 'hidden'} absolute -right-1 top-[30px] w-[100px] rounded-[10px] bg-white px-2 py-3 text-center text-sm font-medium text-[var(--gray-5)]`}
              >
                <li
                  className="border-b border-[var(--gray-3)] p-1 hover:text-[--primary]"
                  onClick={() => setShareOpen(true)}
                >
                  공유하기
                </li>
                <li
                  className="border-b border-[var(--gray-3)] p-1 hover:text-[--primary]"
                  onClick={() => setModifyOpen(true)}
                >
                  수정하기
                </li>
                <li
                  className="border-b border-[var(--gray-3)] p-1 hover:text-[--primary]"
                  onClick={() => setDeleteOpen(true)}
                >
                  삭제하기
                </li>
              </ul>
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
      {<ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />}
      {<ModifyModal isOpen={modifyOpen} onClose={() => setModifyOpen(false)} />}
      {<DeleteModal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} />}
    </div>
  );
}

export default MyReview;
