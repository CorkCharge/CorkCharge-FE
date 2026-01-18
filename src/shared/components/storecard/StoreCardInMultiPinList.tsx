import Save from './save.svg';
import NotSave from './notsave.svg'; // 필요시 사용
import Share from './share.svg';
import Star from '../../assets/star.svg';
import DummyFood from './dummyFood.svg';

// [수정] API 데이터 타입에 맞춰 Props 인터페이스 정의
interface StoreCardProps {
  resId: number;
  name: string;
  rating: number;
  reviewCount: number;
  address: string; // 필요하다면 UI에 추가
  scrap: boolean;
  corkagePrice: string;
  corkageOptions: string[];
  mainImageUrls: string[];
  openingHours: string;
  onClick: () => void; // 카드 클릭 시 상세 이동
}

const StoreCard = ({
  resId,
  name,
  rating,
  reviewCount,
  scrap,
  corkagePrice,
  corkageOptions,
  mainImageUrls,
  openingHours,
  onClick,
}: StoreCardProps) => {
  // 이미지 로드 에러 시 처리를 위한 핸들러
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DummyFood; // 에러 시 더미 이미지로 대체
  };

  // 버튼 클릭 이벤트 전파 방지 (카드 클릭과 분리)
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, action: string) => {
    e.stopPropagation();
    console.log(`${action} 버튼 클릭: ${resId}`);
    // 추후 스크랩/공유 로직 연결
  };

  return (
    <div className="flex w-full flex-col bg-white" onClick={onClick}>
      {/* 1. 상단 정보 영역 (이름, 아이콘) */}
      <div className="relative flex w-full items-start justify-between pl-[17px]">
        {/* 식당 이름 */}
        <h2 className="text-[20px] font-bold leading-none text-[#35353F]">{name}</h2>
        {/* 우측 아이콘 버튼들 */}
        <div className="flex gap-[4px]">
          <button type="button" onClick={(e) => handleButtonClick(e, 'Scrap')}>
            {/* scrap ? Save : NotSave */}
            <img src={scrap ? Save : NotSave} alt="save" className="h-[25px] w-[25px]" />
          </button>
          <button type="button" onClick={(e) => handleButtonClick(e, 'Share')}>
            <img src={Share} alt="share" className="h-[25px] w-[25px]" />
          </button>
        </div>
      </div>

      {/* 2. 평점 및 영업 정보 */}
      <div className="mt-[4px] flex items-center pl-[17px]">
        <img src={Star} alt="star" className="h-[15px] w-[16px]" />

        {/* 평점 */}
        <span className="ml-[4px] text-[16px] font-[500] text-[#35353F]">{rating}</span>

        {/* 리뷰 수 */}
        <span className="ml-[4px] text-[14px] font-[500] text-[#9FA2AA]">({reviewCount})</span>

        {/* 구분 여백 */}
        <div className="ml-[9px] flex items-center gap-[4px]">
          {/* 영업 상태 */}
          <span className="text-[14px] font-[600] text-[#35353F]">영업중</span>
          {/* 영업 시간 => openingHours */}
          <span className="max-w-[120px] truncate text-[14px] font-[500] text-[#9FA2AA]">
            {openingHours}
          </span>
        </div>
      </div>

      {/* 3. 음식 이미지 리스트 => mainImageUrls */}
      <div className="mt-[9.5px] flex w-full gap-[5px] overflow-hidden pl-[17px]">
        {mainImageUrls && mainImageUrls.length > 0 ? (
          mainImageUrls
            .slice(0, 4)
            .map((url, index) => (
              <img
                key={index}
                src={url}
                onError={handleImageError}
                alt={`${name}-food-${index}`}
                className="h-[80px] w-[80px] rounded-[4px] object-cover"
              />
            ))
        ) : (
          // 이미지가 없을 경우 더미 표시
          <img
            src={DummyFood}
            alt="no-image"
            className="h-[80px] w-[80px] rounded-[4px] object-cover"
          />
        )}
      </div>

      {/* 4. 하단 정보 박스 (비용/기타) */}
      <div className="mt-[7.6px] flex h-[73px] w-full flex-col justify-center rounded-[16px] bg-[#F3F3F6] px-[17px]">
        {/* 비용 행 */}
        <div className="flex w-full items-center">
          <span className="min-w-fit text-[16px] font-[700] text-[#35353F]">비용</span>
          <span className="ml-[36.5px] truncate text-[14px] font-[500] text-[#35353F]">
            {corkagePrice}
          </span>
        </div>

        {/* 구분선 (width 329px 대응: 부모 padding 고려하면 거의 꽉 참) */}
        <div className="my-[8px] h-[1px] w-full bg-[#80818B] opacity-20" />

        {/* 기타 행 */}
        <div className="flex w-full items-center">
          <span className="min-w-fit text-[16px] font-[700] text-[#35353F]">기타</span>
          <span className="ml-[36.5px] line-clamp-2 text-[14px] font-[500] text-[#35353F]">
            {corkageOptions?.join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
