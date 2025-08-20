import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import Modal from '@/shared/components/common/Modal';

import useMyPageStore from '@/shared/store/useMyPageStore';

import pencil from '@/shared/components/myPage/images/pencil.png';
import crossMark from '@/shared/assets/images/plus.png';
import { ImageInput } from '@/shared/components/common/Input';
import apiClient from '@/shared/apis/apiClient';

function ModifyInfo() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState('');

  // DANGER:: Following Code MUST BE Deleted After DEMO
  // =============================================
  const [master, setMaster] = useState(0);
  // =============================================

  const fileSelector = useRef<HTMLInputElement>(null);

  const { myProfile, setMyProfile } = useMyPageStore();

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

  // 프로필 미리보기 URL 생성
  const handleFileSelector = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedProfile(file);
    }
  };

  // 프로필 수정
  const updateProfile = () => {
    if (!nickname) return;

    // DANGER:: Following Code MUST BE Deleted After DEMO
    // =============================================
    if (nickname === 'Owner' || nickname === 'Admin') {
      if (master === 6) {
        apiClient.post('/users/role', { role: nickname }).then((res) => console.log(res));
        setMaster(0);
      } else {
        setMaster((prev) => prev + 1);
      }
      return;
    }
    // ===============================================

    const formData = new FormData();
    formData.append('name', nickname);
    if (selectedProfile) {
      formData.append('image', selectedProfile);
    }

    apiClient
      .put('/users/modify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        // 서버 전송 후 업데이트 내용 store에 반영
        apiClient
          .get('/users')
          .then((res) => {
            const { name, image_url } = res.data.data;
            setMyProfile({ nickname: name, profile_image: image_url });
            setNickname('');
          })
          .catch((e) => console.error('프로필 업데이트 실패 : ' + e));
      })
      .catch((e) => console.error('프로필 서버 전송 실패 : ' + e));
  };

  // 탈퇴 처리
  const withdraw = () => {
    apiClient
      .delete('/users')
      .then(() => {
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
        <div>
          <div
            className={`relative mb-5 size-[130px] ${!previewUrl && myProfile?.profile_image && 'rounded-full bg-[var(--gray-3)]'}`}
          >
            {!previewUrl && myProfile?.profile_image && (
              <img src={myProfile?.profile_image} className="size-full rounded-full" />
            )}
            {previewUrl && <img src={previewUrl} className="size-full rounded-full" />}

            <div
              className="absolute bottom-0 right-0 flex size-[48px] cursor-pointer items-center justify-center rounded-full bg-[var(--gray-4)]"
              onClick={() => fileSelector.current?.click()}
            >
              <img src={pencil} className="size-[28px]" />
            </div>
            <input
              type="file"
              className="hidden"
              ref={fileSelector}
              onChange={handleFileSelector}
              accept="image/*"
            />
          </div>
        </div>
        <p className="mb-10 flex w-full gap-7 text-start font-bold text-[var(--gray-8)]">
          <span className="min-w-[100px]">로그인한 계정</span>
          <span className="overflow-auto break-words">{myProfile.socialId}</span>
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
            <span className="text-sm font-medium text-[var(--gray-5)]">
              현재 닉네임 : {myProfile.nickname}
            </span>
          </div>
        </div>
      </div>

      <button
        className={`fixed bottom-4 left-[10%] right-[10%] mx-auto h-[48px] w-[80%] max-w-[480px] rounded-[10px] font-bold ${nickname ? 'bg-[var(--primary)] text-white' : 'bg-[var(--gray-1)] text-[var(--gray-8)]'}`}
        onClick={updateProfile}
      >
        변경하기
      </button>

      {withdrawCheck()}
      {completeWithDraw()}
    </div>
  );
}

export default ModifyInfo;
