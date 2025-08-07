import Star from '../../../../shared/assets/star.svg';
import Placeholder from '../../../../shared/assets/placeholder.svg';
const RestaurantBox = () => {
  return (
    <div className="flex h-[216px] w-full flex-col pl-[20px] pr-[20px] pt-[20px]">
      <div className="text-20px font-[700]">엔비햄버거</div>
      <div className="mt-[3px] flex w-full flex-row items-center">
        <img className="h-[15px] w-[16px]" src={Star} alt="별" />
        <p className="ml-[4px] text-[16px] font-[500]">4.2</p>
        <p className="ml-[7px] text-[16px] font-[400]">리뷰 total 1,245</p>
        <div className="ml-auto flex flex-row gap-[6px]">
          <button
            style={{ background: 'rgba(218, 203, 182, 0.30)' }}
            className="h-[28px] w-[54px] rounded-[20px] text-[12px] font-[500]"
          >
            예약
          </button>
          <button
            style={{ background: 'rgba(218, 203, 182, 0.30)' }}
            className="h-[28px] w-[54px] rounded-[20px] text-[12px] font-[500]"
          >
            공유
          </button>
          <button
            style={{ background: 'rgba(218, 203, 182, 0.30)' }}
            className="h-[28px] w-[54px] rounded-[20px] text-[12px] font-[500]"
          >
            저장
          </button>
        </div>
      </div>
      <div className="mt-[15px] flex flex-row gap-[17px]">
        <img className="h-[127px] w-[125.8px]" src={Placeholder} />
        <div className="flex w-full flex-col">
          <div className="flex flex-row gap-[36px] border-t-[1px] border-t-[#C5C8CF] pb-[6px] pt-[6px]">
            <p className="text-[16px] font-[700]">비용</p>
            <p className="text-[16px] font-[400]">병당 1만원</p>
          </div>
          <div className="flex flex-row items-center gap-[36px] border-b-[1px] border-t-[1px] border-b-[#C5C8CF] border-t-[#C5C8CF] pb-[6px] pt-[6px]">
            <p className="text-[16px] font-[700]">기타</p>
            <div>
              <p className="text-[16px] font-[400]">잔 제공</p>
              <p className="text-[16px] font-[400]">얼음 제공</p>
              <p className="text-[16px] font-[400]">한병 무료</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBox;
