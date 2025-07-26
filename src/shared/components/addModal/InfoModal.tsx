type InfoModalProps = {
  storeName: string;
};

const InfoModal = ({ storeName }: InfoModalProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex hidden h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div
        className="h-[53.08%] w-[293px] rounded-[16px] bg-white/80 pb-[24px] pl-[15px] pr-[15px] pt-[24px] text-[24px] font-[700]"
        style={{
          boxShadow:
            '0px 4px 20px 0px rgba(58, 13, 16, 0.20), 0.318px 0.318px 2px 0px rgba(255, 255, 255, 0.30) inset',
        }}
      >
        <div className="mb-[20px]">{storeName}</div>
        <div className="flex h-[216px] flex-col bg-yellow-200">
          <div className="text-[16px] font-[700]">콜키지 정보</div>
          <div className="flex flex-row gap-[20px]">
            <div className="text-[16px] font-[700]">기본 정보</div>
            <div className="text-[16px] font-[500]">병당 콜키지 10,000원</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
