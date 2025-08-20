import { useState } from 'react';
import Star from '../../../../shared/assets/star.svg';
import Placeholder from '../../../../shared/assets/placeholder.svg';
import Share from '../../detail/Share';

interface RestaurantBoxProps {
  name: string;
  rating: number;
  reviewCount: number;
  corkagePrice: string;
  corkageOptions: string[];
  imageUrl: string;
  resId: number;
  onClick: () => void;
}

const RestaurantBox = ({
  name,
  rating,
  reviewCount,
  corkagePrice,
  corkageOptions,
  imageUrl,
  resId,
  onClick,
}: RestaurantBoxProps) => {
  //링크 공유하기 기능
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('공유하기 창 띄우기');
    setOpenShareModal(true);
  };

  const handleCopyLink = () => {
    try {
      const pathURL = `detailInfo/${resId};`;
      console.log(pathURL);
      navigator.clipboard.writeText(pathURL);
      setOpenShareModal(false);
      alert('링크가 클립보드에 복사되었습니다: ');
    } catch {
      console.error('복사 실패');
      // alert('클립보드 복사에 실패하였습니다.');
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = Placeholder;
  };

  return (
    <div className="flex h-[216px] w-full flex-col pl-[20px] pr-[20px] pt-[20px]">
      <div className="text-20px font-[700]" onClick={onClick}>
        {name}
      </div>
      <div className="mt-[3px] flex w-full flex-row items-center">
        <img className="h-[15px] w-[16px]" src={Star} alt="별" onClick={onClick} />
        <p className="ml-[4px] text-[16px] font-[500]" onClick={onClick}>
          {rating}
        </p>
        <p className="ml-[7px] text-[16px] font-[400]" onClick={onClick}>
          리뷰 total {reviewCount}
        </p>
        <div className="ml-auto flex flex-row gap-[6px]">
          {/* <button
            style={{ background: 'rgba(218, 203, 182, 0.30)' }}
            className="h-[28px] w-[54px] rounded-[20px] text-[12px] font-[500]"
          >
            예약
          </button> */}
          <button
            style={{ background: 'rgba(218, 203, 182, 0.30)' }}
            className="h-[28px] w-[54px] rounded-[20px] text-[12px] font-[500]"
            onClick={handleShare}
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
      <div className="mt-[15px] flex flex-row gap-[17px]" onClick={onClick}>
        <img
          className="h-[127px] w-[125.8px]"
          onError={handleImageError}
          alt={`${name} 이미지`}
          src={imageUrl}
        />
        <div className="flex w-full flex-col">
          <div className="flex flex-row gap-[36px] border-t-[1px] border-t-[#C5C8CF] pb-[6px] pt-[6px]">
            <p className="text-[16px] font-[700]">비용</p>
            <p className="text-[16px] font-[400]">{corkagePrice}</p>
          </div>
          <div className="flex flex-row items-center gap-[36px] border-b-[1px] border-t-[1px] border-b-[#C5C8CF] border-t-[#C5C8CF] pb-[6px] pt-[6px]">
            <p className="min-w-[30px] text-[16px] font-[700]">기타</p>
            <div className="flex flex-col">
              {corkageOptions.map((option, index) => (
                <p key={index} className="min-w-[52px] text-[16px] font-[400]">
                  {option}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {openShareModal && (
        <Share
          handleOpt1Click={() => handleCopyLink()}
          handleOpt2Click={() => setOpenShareModal(false)}
        />
      )}
    </div>
  );
};

export default RestaurantBox;
