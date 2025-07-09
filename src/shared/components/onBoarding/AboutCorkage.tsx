import ProgressDots from './ProgressDots';

function AboutCorkage() {
  return (
    <div className="flex h-screen flex-col items-center bg-wine-background bg-[length:160%_120%] bg-[position:25%_35%] text-white">
      {/* 어두운 배경색 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      {/* 배경 그라데이션 오버레이 */}
      <div className="absolute bottom-0 h-[20%] w-full bg-[linear-gradient(to_bottom,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.3)_30%,_rgba(255,255,255,0.8)_50%,_rgba(255,255,255,1)_70%,_rgba(255,255,255,1.0)_100%)]" />

      <div className="z-10 w-full text-center">
        <ProgressDots total={4} now={1} className="mt-24" />
        <h1 className="mt-24 text-3xl font-bold">콜키지란?</h1>
        <div className="mt-[52px] flex flex-col text-center">
          <h2 className="text-xl leading-7">주류반입비</h2>
          <h3 className="text-lg leading-7 text-[#dbdde1]">
            음식점에 외부 술을 가져와서 마시는 것
          </h3>
        </div>
        <div className="fixed bottom-8 left-10 right-10">
          <p className="mb-8 text-[15px] font-medium">경우에 따라 잔과 얼음을 제공하기도 합니다.</p>
          <button className="button-shadow h-12 w-full rounded-lg bg-white/80 text-black">
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutCorkage;
