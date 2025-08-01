import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import Modal from '@/shared/components/common/Modal';

import pencil from '@/shared/components/myPage/images/pencil.png';
import crossMark from '@/shared/assets/images/plus.png';

function ModifyInfo() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  const withdrawCheck = () => (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setModalOpen(false)}
      className="bg-[rgba(255,255,255,0.8)] px-4 pt-[45px]"
    >
      <p className="mb-4 text-center font-bold text-[var(--gray-8)]">정말 탈퇴하시겠습니까?</p>
      <div className="flex w-full gap-3">
        <button
          onClick={() => setModalOpen(false)}
          className="h-[48px] flex-1 rounded-xl bg-white px-4 py-2 font-semibold text-[var(--gray-8)] hover:bg-gray-400"
        >
          아니오
        </button>
        <button
          onClick={() => setSecondModalOpen(true)}
          className="h-[48px] flex-1 rounded-xl bg-white px-4 py-2 font-semibold text-[var(--gray-8)] hover:bg-gray-400"
        >
          예
        </button>
      </div>
    </Modal>
  );

  const completeWithDraw = () => (
    <Modal isOpen={isSecondModalOpen} className="bg-[rgba(255,255,255,0.8)] px-4 pt-[45px]">
      <p className="mb-5 text-center font-bold text-[var(--gray-8)]">탈퇴가 완료되었습니다.</p>
      <div className="flex w-full gap-3">
        <button
          onClick={() => {
            setSecondModalOpen(false);
            navigate('/');
          }}
          className="h-[48px] flex-1 rounded-xl bg-white px-4 py-2 font-semibold text-[var(--gray-8)] hover:bg-gray-400"
        >
          확인
        </button>
      </div>
    </Modal>
  );

  return (
    <div className="px-4">
      <Header
        title="마이페이지"
        type="additional"
        fnTitle="회원탈퇴"
        addiFn={() => {
          setModalOpen(true);
        }}
      />

      <div className="mt-10 flex flex-col items-center">
        <div>
          <div className="relative mb-5 size-[130px] rounded-full bg-[var(--gray-3)]">
            <div className="absolute bottom-0 right-0 flex size-[48px] items-center justify-center rounded-full bg-[var(--gray-4)]">
              <img src={pencil} className="size-[28px]" />
            </div>
          </div>
        </div>
        <p className="mb-10 flex w-full gap-7 text-start font-bold text-[var(--gray-8)]">
          <span>로그인한 계정</span>
          <span>tempidiidiid</span>
        </p>
        <div className="flex w-full justify-start gap-7">
          <span className="font-bold text-[var(--gray-8)]">닉네임</span>
          <div className="flex flex-1 flex-col gap-2">
            <div className="relative h-[48px] rounded-ee-full rounded-ss-full bg-[var(--gray-1)]">
              <input
                className="mx-6 h-full bg-transparent"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <img
                src={crossMark}
                className="absolute right-8 top-1/2 h-[11px] w-[11px] -translate-y-1/2 rotate-45"
                onClick={() => setNickname('')}
              />
            </div>
            <span className="text-sm font-medium text-[var(--gray-5)]">현재 닉네임 : 정빙빙</span>
          </div>
        </div>
      </div>

      <button
        className={`fixed bottom-4 left-[10%] right-[10%] mx-auto h-[48px] w-[80%] max-w-[480px] rounded-[10px] font-bold ${nickname ? 'bg-[var(--primary)] text-white' : 'bg-[var(--gray-1)] text-[var(--gray-8)]'}`}
      >
        변경하기
      </button>

      {withdrawCheck()}
      {completeWithDraw()}
    </div>
  );
}

export default ModifyInfo;
