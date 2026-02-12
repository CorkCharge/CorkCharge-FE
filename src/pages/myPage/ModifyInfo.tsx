import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import Modal from '@/shared/components/common/Modal';

import useMyPageStore from '@/shared/store/useMyPageStore';
import useAuthStore from '@/shared/store/useAuthStore';
import { ImageInput } from '@/shared/components/common/Input';
import apiClient from '@/shared/apis/apiClient';

import crossMark from '@/shared/assets/images/plus.png';
import { useSetNickname, useUpdateNickname } from '@/shared/queries/user/useMyPage';

function ModifyInfo() {
  const navigate = useNavigate();

  const from = useLocation().state?.from;

  const [nickname, setNickname] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);
  const [isModifyComplete, setIsModifyComplete] = useState(false);

  const { myProfile, setMyProfile } = useMyPageStore();
  const { logout } = useAuthStore();

  // 탈퇴하기 모달 생성
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
          onClick={withdraw}
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

  // 수정 완료 모달
  const modifyCompleteModal = () => (
    <Modal isOpen={isModifyComplete} className="bg-white px-4 pt-[45px]">
      <h3 className="mb-1 text-center text-2xl font-bold">수정완료</h3>
      <p className="mb-5 text-center font-medium text-[var(--gray-8)]">수정이 완료되었습니다.</p>
      <div className="flex w-full gap-3">
        <button
          onClick={() => {
            setIsModifyComplete(false);
            navigate(-1);
          }}
          className="h-[48px] flex-1 rounded-xl bg-[var(--gray-1)] px-4 py-2 font-semibold text-[var(--gray-8)] hover:bg-gray-400"
        >
          확인
        </button>
      </div>
    </Modal>
  );

  // 프로필 수정
  const setMutation = useSetNickname();
  const updateMutation = useUpdateNickname();

  const updateProfile = () => {
    if (!nickname) return;

    if (from === 'signup') {
      setMutation.mutate(
        { role: 'USER', nickname },
        {
          onSuccess: () => {
            setMyProfile({ nickname });
            navigate('/my/role/complete');
          },
          onError: (e) => console.error('닉네임 등록 실패: ' + e),
        }
      );
    } else {
      updateMutation.mutate(
        { name: nickname },
        {
          onSuccess: () => {
            setMyProfile({ nickname });
            setIsModifyComplete(true);
          },
          onError: (e) => console.error('닉네임 등록 실패: ' + e),
        }
      );
    }
  };

  // const updateProfile = async () => {
  //   if (!nickname) return;

  //   try {
  //     if (from === 'signup') {
  //       await modifyRole({ role: 'USER', nickname });
  //       navigate('/my/role/complete');
  //     } else {
  //       await modifyName(nickname);
  //       setIsModifyComplete(true);
  //     }
  //   } catch (e) {
  //     console.error('닉네임 등록 실패: ' + e);
  //   }
  // };

  // 탈퇴 처리
  const withdraw = () => {
    apiClient
      .delete('/users')
      .then(() => {
        logout();
        setSecondModalOpen(true);
      })
      .catch((e) => {
        console.error('탈퇴 처리 중 오류 발생 : ' + e);
      });
  };

  return (
    <div className="px-4">
      <Header
        title="마이페이지"
        type="additional"
        fnTitle="회원탈퇴"
        addiFn={() => {
          setModalOpen(true);
        }}
        backFn={() => navigate(-1)}
      />

      <div className="mt-10 flex flex-col items-center">
        <p className="mb-10 flex w-full gap-7 text-start font-bold text-[var(--gray-8)]">
          <span className="min-w-[100px]">로그인한 계정</span>
          <span className="overflow-auto break-words">{myProfile.email.split('@')[0]}</span>
        </p>
        <div className="flex w-full justify-start gap-7">
          <span className="font-bold text-[var(--gray-8)]">닉네임</span>
          <div className="flex flex-1 flex-col gap-2">
            <ImageInput
              placeholder="닉네임을 입력하세요"
              imgSrc={crossMark}
              imgClassName="rotate-45 cursor-pointer"
              onImgClick={() => setNickname('')}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {from === 'mypage' && (
              <span className="text-sm font-medium text-[var(--gray-5)]">
                현재 닉네임 : {myProfile.nickname}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        className={`fixed bottom-4 left-[10%] right-[10%] mx-auto h-[48px] w-[80%] rounded-[10px] font-bold ${nickname ? 'bg-[var(--primary)] text-white' : 'bg-[var(--gray-1)] text-[var(--gray-8)]'}`}
        style={{ maxWidth: 'calc(var(--app-width) * 0.8 )' }}
        onClick={updateProfile}
      >
        {from === 'signup' ? '시작하기' : '변경하기'}
      </button>

      {withdrawCheck()}
      {completeWithDraw()}
      {modifyCompleteModal()}
    </div>
  );
}

export default ModifyInfo;
