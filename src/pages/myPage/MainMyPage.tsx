import { useRef } from 'react';

import Header from '@/shared/components/common/Header';
import { ControlLists, ControlItem } from '@/shared/components/myPage/ControlList';
import { GuestMyPage, LoggedInMyPage } from '@/shared/components/myPage/MyPageBranch';

function MainMyPage() {
  const isLogged = useRef(false);

  return (
    <main className="px-4">
      <Header title="마이페이지" />

      {isLogged.current ? <LoggedInMyPage /> : <GuestMyPage />}

      <ControlLists>
        <ControlItem>알림 설정</ControlItem>
        <ControlItem>약관 및 개인정보 처리방침</ControlItem>
        <ControlItem>문의하기</ControlItem>
      </ControlLists>

      {isLogged.current && (
        <div className="mt-10 text-center">
          <span className="font-medium text-[var(--gray-6)] underline underline-offset-2">
            로그아웃
          </span>
        </div>
      )}
    </main>
  );
}

export default MainMyPage;
