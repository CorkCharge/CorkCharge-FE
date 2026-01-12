import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import { ControlLists, ControlItem } from '@/shared/components/myPage/ControlList';
import { GuestMyPage, LoggedInMyPage } from '@/shared/components/myPage/MyPageBranch';

import useAuthStore from '@/shared/store/useAuthStore';
import useFooterPropsStore from '@/shared/store/useFooterProps';

function MainMyPage() {
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const { logout } = useAuthStore();
  const { setFooterProps } = useFooterPropsStore();

  const isLogged = user ? true : false;

  return (
    <main className="mb-5 px-4">
      <Header title="마이페이지" />

      {isLogged ? <LoggedInMyPage /> : <GuestMyPage />}

      {/* <ControlLists>
        <ControlItem onClick={() => navigate('/my/notification/setting')}>알림 설정</ControlItem>
        <ControlItem onClick={() => navigate('/my/toc')}>약관 및 개인정보 처리방침</ControlItem>
        <ControlItem onClick={() => navigate('/my/contact')}>문의하기</ControlItem>
      </ControlLists> */}

      {isLogged && (
        <div className="mt-10 text-center">
          <span
            className="cursor-pointer font-medium text-[var(--gray-6)] underline underline-offset-2"
            onClick={() => {
              navigate('/home');
              logout();
              setFooterProps(0);
            }}
          >
            로그아웃
          </span>
        </div>
      )}
    </main>
  );
}

export default MainMyPage;
