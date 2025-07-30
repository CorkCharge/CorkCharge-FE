import { useState } from 'react';

import Header from '@/shared/components/common/Header';
import { StarRate } from '@/shared/components/myPage/StarRate';
import Modal from '@/shared/components/common/Modal';

import threeDots from '@/shared/assets/images/threedots.png';
import camera from '@/shared/components/myPage/images/camera.png';

function MyReview() {
  const [isOpen, setIsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [reviewInput, setReviewInput] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const shareModal = () => (
    <Modal isOpen={shareOpen} className="bg-[rgba(255,255,255,0.8)]">
      <h3 className="mb-2 text-center font-bold text-[var(--gray-8)]">후기를 공유하시겠습니까?</h3>
      <p className="mb-1 text-center text-sm font-medium text-[var(--gray-8)]">깍둑 건대점</p>
      <p className="text-center text-[10px] text-[var(--gray-6)]">2025.07.24 작성</p>
      <div className="mt-5 flex w-full gap-1">
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-white font-bold text-[var(--gray-7)]"
          onClick={() => setShareOpen(false)}
        >
          취소
        </button>
        <button className="h-[44px] flex-1 rounded-[10px] bg-[rgba(144,33,70,0.15)] font-bold text-[var(--primary)]">
          공유
        </button>
      </div>
    </Modal>
  );

  const modifyModal = () => (
    <Modal isOpen={modifyOpen} className="bg-[rgba(255,255,255,0.8)] text-center">
      <h3 className="mb-2 text-center text-2xl font-bold text-[var(--gray-8)]">리뷰 수정</h3>
      <StarRate rate={3} className="mb-7 justify-center" />
      <div className="relative mb-5 h-[150px] rounded-ee-[30px] rounded-ss-[30px] bg-white">
        <textarea
          className="h-full w-full resize-none rounded-ee-[30px] rounded-ss-[30px] p-5 pr-10 pt-3 text-xs"
          value={reviewInput}
          onChange={(e) => setReviewInput(e.target.value)}
        />
        <span className="absolute right-2 top-2">&times;</span>
      </div>

      <button className="flex h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--gray-1)] text-sm font-bold text-[var(--primary)]">
        <img src={camera} className="h-[22px] w-[25px]" />
        사진 첨부하기
      </button>
      <div className="mt-5 flex w-full gap-1">
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-[var(--gray-1)] font-bold text-[var(--gray-7)]"
          onClick={() => setModifyOpen(false)}
        >
          취소
        </button>
        <button
          className={`h-[44px] flex-1 rounded-[10px] font-bold ${reviewInput ? 'bg-[var(--primary)] text-white' : 'bg-[var(--gray-1)] text-[var(--gray-7)]'}`}
        >
          완료
        </button>
      </div>
    </Modal>
  );

  const deleteModal = () => (
    <Modal isOpen={deleteOpen} className="bg-[rgba(255,255,255,0.8)]">
      <h3 className="mb-2 text-center font-bold text-[var(--gray-8)]">후기를 삭제하시겠습니까?</h3>
      <p className="mb-1 text-center text-sm font-medium text-[var(--gray-8)]">깍둑 건대점</p>
      <p className="text-center text-[10px] text-[var(--gray-6)]">2025.07.24 작성</p>
      <div className="mt-5 flex w-full gap-1">
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-white font-bold text-[var(--gray-7)]"
          onClick={() => setDeleteOpen(false)}
        >
          취소
        </button>
        <button className="h-[44px] flex-1 rounded-[10px] bg-[rgba(144,33,70,0.15)] font-bold text-[var(--primary)]">
          삭제
        </button>
      </div>
    </Modal>
  );

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
                  onClick={() => setDeleteOpen(false)}
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
      {shareModal()}
      {modifyModal()}
      {deleteModal()}
    </div>
  );
}

export default MyReview;
