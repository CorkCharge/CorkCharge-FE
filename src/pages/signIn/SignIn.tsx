import logo from '@/shared/assets/images/mainLogo.svg';
import naver from '@/shared/assets/images/naver.png';

function SignIn() {
  return (
    <main className="bg-gradient h-full">
      <div className="flex flex-col pt-[104px] text-center text-3xl font-bold">
        <h1>코르크차지를</h1>
        <h1>시작해볼까요?</h1>
      </div>
      <div className="mb-10 mt-[60px] flex justify-center">
        <img src={logo} />
      </div>
      <div className="flex flex-col items-center gap-3">
        <button className="flex h-[54px] w-[90%] items-center justify-center gap-4 rounded-[4px] bg-white">
          <img src={naver} className="size-4" />
          <span>네이버 로그인</span>
        </button>
        <span className="text-[#ecedef] underline underline-offset-4">로그인 없이 보기</span>
      </div>
    </main>
  );
}

export default SignIn;
