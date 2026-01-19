import Save from './save.svg';
//import NotSave from "./notsave.svg"; // 필요시 사용
import Share from './share.svg';
import Star from '../../assets/star.svg';
import DummyFood from './dummyFood.svg';

const StoreCard = () => {
  return (
    <div className="flex w-full flex-col bg-white">
      {/* 1. 상단 정보 영역 (이름, 아이콘) */}
      <div className="relative flex w-full items-start justify-between pl-[17px]">
        {/* 식당 이름 */}
        <h2 className="text-[20px] font-bold leading-none text-[#35353F]">엔비햄버거</h2>
        {/* 우측 아이콘 버튼들 */}
        <div className="flex gap-[4px]">
          <button type="button">
            <img src={Save} alt="save" className="h-[25px] w-[25px]" />
          </button>
          <button type="button">
            <img src={Share} alt="share" className="h-[25px] w-[25px]" />
          </button>
        </div>
      </div>

      {/* 2. 평점 및 영업 정보 */}
      <div className="mt-[4px] flex items-center pl-[17px]">
        <img src={Star} alt="star" className="h-[15px] w-[16px]" />

        {/* 평점 */}
        <span className="ml-[4px] text-[16px] font-[500] text-[#35353F]">4.2</span>

        {/* 리뷰 수 */}
        <span className="ml-[4px] text-[14px] font-[500] text-[#9FA2AA]">(333)</span>

        {/* 구분 여백 */}
        <div className="ml-[9px] flex items-center gap-[4px]">
          {/* 영업 상태 */}
          <span className="text-[14px] font-[600] text-[#35353F]">영업중</span>
          {/* 영업 시간 */}
          <span className="text-[14px] font-[500] text-[#9FA2AA]">4:00 영업종료</span>
        </div>
      </div>

      {/* 3. 음식 이미지 리스트 (가로 스크롤 가능성 고려하여 flex-nowrap) */}
      <div className="mt-[9.5px] flex w-full gap-[5px] overflow-hidden pl-[17px]">
        {[1, 2, 3, 4].map((_, index) => (
          <img
            key={index}
            src={DummyFood}
            alt={`food-${index}`}
            className="h-[80px] w-[80px] rounded-[4px] object-cover"
          />
        ))}
      </div>

      {/* 4. 하단 정보 박스 (비용/기타) */}
      <div className="mt-[7.6px] flex h-[73px] w-full flex-col justify-center rounded-[16px] bg-[#F3F3F6] px-[17px]">
        {/* 비용 행 */}
        <div className="flex w-full items-center">
          <span className="min-w-fit text-[16px] font-[700] text-[#35353F]">비용</span>
          <span className="ml-[36.5px] truncate text-[14px] font-[500] text-[#35353F]">
            병당 1만원
          </span>
        </div>

        {/* 구분선 (width 329px 대응: 부모 padding 고려하면 거의 꽉 참) */}
        <div className="my-[8px] h-[1px] w-full bg-[#80818B] opacity-20" />

        {/* 기타 행 */}
        <div className="flex w-full items-center">
          <span className="min-w-fit text-[16px] font-[700] text-[#35353F]">기타</span>
          <span className="ml-[36.5px] truncate text-[14px] font-[500] text-[#35353F]">
            잔 제공, 얼음 제공, 리뷰이벤트: 한병 무료 ddddddddddddddd
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
