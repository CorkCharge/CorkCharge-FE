const BottomButtonContainer = () => {
  return (
    <div className="absolute bottom-[3.169%] z-10 flex w-full justify-center gap-[3.53%]">
      <button
        onClick={() => console.log('초기화 클릭')}
        className="mr-2 h-[48px] w-[35%] rounded-lg border bg-[#F3F3F6] py-2 font-bold"
      >
        초기화
      </button>
      <button
        onClick={() => console.log('적용하기 클릭')}
        className="h-[48px] w-[53.28%] rounded-lg bg-[#90212A] py-2 font-bold text-white"
      >
        적용하기
      </button>
    </div>
  );
};

export default BottomButtonContainer;
