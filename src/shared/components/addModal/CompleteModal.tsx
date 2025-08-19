type CompleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const CompleteModal = ({ onClose, onConfirm }: CompleteModalProps) => {
  return (
    // 배경 오버레이
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
      {/* 모달 컨테이너 */}
      <div
        className="flex h-[160px] w-[293px] flex-col items-center justify-center rounded-[16px] bg-white/80 p-6"
        style={{
          boxShadow:
            '0px 4px 20px 0px rgba(58, 13, 16, 0.20), 0.318px 0.318px 2px 0px rgba(255, 255, 255, 0.30) inset',
        }}
      >
        <p className="mb-6 text-center text-[16px] font-[700]">등록이 완료되었습니다.</p>
        <div className="flex w-full flex-row justify-center gap-[12px]">
          <button
            className="h-[48px] w-[45%] cursor-pointer items-center rounded-[12px] bg-[#F3F3F6] text-[16px] font-[700] text-black"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            onClick={onConfirm}
            className="h-[48px] w-[45%] cursor-pointer items-center rounded-[12px] bg-[#90212A] text-[16px] font-[700] text-white"
          >
            확인하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;
