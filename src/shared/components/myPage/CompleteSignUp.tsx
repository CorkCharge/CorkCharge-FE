import logo from '@/shared/assets/images/logo.svg';
import arrow from '@/shared/assets/whiteArrow.svg';

function CompleteSignUp() {
  return (
    <div className="px-4">
      <div className="pt-[60px]"></div>

      <div
        className="h-[6px] rounded-[4.5px]"
        style={{ boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1) inset' }}
      >
        <div className="h-full w-full rounded-[4.5px] bg-[var(--primary)]"></div>
      </div>

      <div className="mt-[150px] flex flex-col items-center justify-center font-bold text-[var(--gray-8)]">
        <img src={logo} className="mb-10" />
        <p>사장님 회원가입 신청이 완료되었습니다.</p>
        <p>일주일 내 확인 후 가입이 승인됩니다.</p>
      </div>

      <button className="mx-auto mt-10 inline-block flex h-[48px] max-w-[480px] items-center justify-center gap-3 rounded-[10px] bg-[var(--primary)] px-5 font-bold text-white">
        홈으로 돌아가기
        <img src={arrow} className="h-4 w-[9px] rotate-180" />
      </button>
    </div>
  );
}

export default CompleteSignUp;
