import StoreCardInMultiPinList from '../../../shared/components/storecard/StoreCardInMultiPinList';
import V from '../mystore/v.svg';
const MultipinList = () => {
  return (
    // [수정] 전체를 감싸는 하나의 부모 div 안에 내용을 배치합니다.
    <div className="relative flex h-full w-full flex-col bg-white">
      {/* 헤더 영역 (드롭다운) */}
      <div className="flex w-full justify-end px-[15px] pt-[15px]">
        {/* 오른쪽: 드롭다운 */}
        <div className="flex h-[40px] w-[89.2px] cursor-pointer items-center justify-center gap-[2px] rounded-[20px] bg-[#F3F3F6] px-[8px] py-[6px]">
          <span className="text-[12px] font-[500] text-[#80818B]">리뷰많은순</span>
          <img src={V} alt="dropdown" className="mt-[1px]" />
        </div>
      </div>

      {/* 리스트 영역 (스크롤) */}
      {/* 헤더 아래 24px 여백, 좌우 15px 여백 */}
      <div className="mt-[24px] flex flex-1 flex-col gap-[24px] overflow-y-auto px-[15px] pb-[40px] [&::-webkit-scrollbar]:hidden">
        {/* 나중에는 여기도 group.id를 이용해 실제 데이터를 불러와야함 */}
        <StoreCardInMultiPinList />
        <StoreCardInMultiPinList />
        <StoreCardInMultiPinList />
        <StoreCardInMultiPinList />
        {/* 스크롤 확인용 더미 데이터 추가 가능 */}
      </div>
    </div>
  );
};

export default MultipinList;
