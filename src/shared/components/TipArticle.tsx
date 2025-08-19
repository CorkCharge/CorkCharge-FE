// import React from 'react'

interface articleProps {
  tipId: number;
  category: string;
  mainTitle: string;
  subTitle?: string;
  info: string;
  imageUrls: string[];
  createdAt: string;
}

const TipArticle = ({
  tipId,
  category,
  mainTitle,
  subTitle,
  info,
  imageUrls,
  // createdAt,
}: articleProps) => {
  return (
    <div className="mb-8">
      <div className="relative mb-6">
        <img
          key={tipId}
          src={imageUrls ? imageUrls[0] : 'https://placehold.co/393x358'} //우선 첫 번째 사진 사용
          className="h-[358px] w-[393px] rounded-2xl"
        />
        <div className="absolute bottom-8 left-8">
          <div className="w-[280px] font-bold text-[#FFFFFF]">
            <div className="mb-2 text-[20px]">{category}</div>
            <div className="text-[30px]">{mainTitle}</div>
          </div>
        </div>
      </div>

      {/* 상세 설명 */}
      <div className="ml-6 mr-6 w-[313px]">
        <div className="mb-8 w-[200px] whitespace-pre-line text-[24px] font-bold text-[#1E1E1E]">
          {subTitle}
        </div>
        <div className="whitespace-pre-line text-[16px]">{info}</div>
      </div>
    </div>
  );
};
export default TipArticle;
