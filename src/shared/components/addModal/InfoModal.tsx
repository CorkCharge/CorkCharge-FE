type InfoModalProps = {
  storeName: string;
  onClose: () => void;
};

const InfoModal = ({ storeName, onClose }: InfoModalProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div
        className="h-[53.08%] w-[293px] rounded-[16px] bg-white/80 pb-[24px] pl-[15px] pr-[15px] pt-[24px] text-[24px] font-[700]"
        style={{
          boxShadow:
            '0px 4px 20px 0px rgba(58, 13, 16, 0.20), 0.318px 0.318px 2px 0px rgba(255, 255, 255, 0.30) inset',
        }}
      >
        <div className="mb-[20px]">{storeName}</div>
        <div className="flex h-[216px] flex-col gap-[8px] overflow-y-auto bg-yellow-200">
          <div className="text-[16px] font-[700]">콜키지 정보</div>
          <div className="flex flex-row gap-[20px]">
            <div className="text-[16px] font-[700]">기본 정보</div>
            <div className="text-[16px] font-[500]">병당 콜키지 10,000원</div>
          </div>
          <div className="flex flex-row gap-[20px]">
            <div className="text-[16px] font-[700]">세부 옵션</div>
            <div className="gap-[8px] text-[16px] font-[500]">
              <div>얼음제공</div>
              <div>한병무료</div>
              <div>잔 제공</div>
              <div>와인잔 제공</div>
              <div>기타 사항</div>
            </div>
          </div>
        </div>
        <div className="mb-[16px] mt-[24px] h-[1px] w-full bg-black"></div>
        <div className="mb-[24px] text-center text-[16px] font-[700]">위 정보가 맞습니까?</div>
        <div className="flex w-full flex-row justify-center gap-[12px]">
          <button
            className="h-[48px] w-[43%] cursor-pointer items-center rounded-[12px] bg-[#F3F3F6] text-[16px] font-[700] text-black"
            onClick={onClose}
          >
            취소
          </button>
          <button
            onClick={() => console.log('등록하기 버튼 클릭')}
            className="h-[48px] w-[43%] cursor-pointer items-center rounded-[12px] bg-[#90212A] text-[16px] font-[700] text-white"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
