import Button from '../common/Button';
import ProgressDots from './ProgressDots';
import savingSample from '@/shared/assets/images/saving-sample.png';

function AboutSaving() {
  return (
    <div className="h-screen">
      <span className="fixed right-8 top-[50px] text-[var(--corkcharge-gray)] underline underline-offset-4">
        SKIP
      </span>
      <ProgressDots total={4} now={2} color={'var(--corkcharge-gray)'} className="pt-[60px]" />

      <h1 className="mt-11 text-center text-3xl font-bold">
        <p>코르크차지의</p>
        <p>
          콜키지 발굴 방법 <span className="align-super text-sm">1</span>
        </p>
      </h1>
      <h2 className="mt-7 text-center font-medium text-[#585A68]">
        <p>콜키지 비진행 매장의 저장 수가 기준치를</p>
        <p>넘어가면 코르크차지가 직접 달려갑니다</p>
      </h2>
      <div className="mt-[120px] flex justify-center">
        <img src={savingSample} className="block w-[196px] text-center" />
      </div>

      <div className="fixed bottom-8 left-10 right-10">
        <p className="mb-8 text-center text-[15px] text-[var(--corkcharge-gray)]">
          저장하기 한표가 콜키지를 이끌어냅니다.
        </p>
        <Button value="다음" />
      </div>
    </div>
  );
}

export default AboutSaving;
