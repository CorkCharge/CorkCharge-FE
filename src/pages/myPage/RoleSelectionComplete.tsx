import { useNavigate } from 'react-router-dom';

import logo from '@/shared/assets/images/logo.svg';
import arrow from '@/shared/assets/whiteArrow.svg';

function RoleSelectionComplete() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center px-4"
      style={{ height: 'calc(100svh - var(--footer-h))' }}
    >
      <div className="flex flex-col items-center justify-center font-bold text-[var(--gray-8)]">
        <img src={logo} className="mb-10" />
        <p>코르크차지에서 함께 콜키지를 시작해보아요</p>
      </div>

      <button
        className="mx-auto mt-10 inline-block flex h-[48px] max-w-[480px] items-center justify-center gap-3 rounded-[10px] bg-[var(--primary)] px-5 font-bold text-white"
        onClick={() => navigate('/home')}
      >
        홈으로 돌아가기
        <img src={arrow} className="h-4 w-[9px] rotate-180" />
      </button>
    </div>
  );
}

export default RoleSelectionComplete;
