interface CorkageFilterButtonProps {
  onApply: () => void; // 적용하기 버튼 클릭 시 실행할 함수
  onReset: () => void; // 초기화 버튼 클릭 시 실행할 함수
}

const CorkageFilterButton = ({ onApply, onReset }: CorkageFilterButtonProps) => {
  return (
    <div
      className="fixed bottom-[3.169%] left-1/2 z-10 flex w-full -translate-x-1/2 justify-center gap-[3.53%] pb-[50px]"
      style={{ maxWidth: 'var(--app-width)' }}
    >
      <button
        onClick={onReset}
        className="mr-2 h-[48px] w-[35%] rounded-lg border bg-[#F3F3F6] py-2 font-bold"
      >
        초기화
      </button>
      <button
        onClick={onApply}
        className="h-[48px] w-[53.28%] rounded-lg bg-[#90212A] py-2 font-bold text-white"
      >
        적용하기
      </button>
    </div>
  );
};

export default CorkageFilterButton;
