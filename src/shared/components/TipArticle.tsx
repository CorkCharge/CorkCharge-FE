// import React from 'react'

interface articleProps {
  category: string;
  mainTitle: string;
  subTitle: string;
  info: string;
}

const TipArticle = ({ category, mainTitle, subTitle, info }: articleProps) => {
  return (
    <div className="mb-8">
      <div className="relative mb-6">
        <img src="https://placehold.co/393x358" className="rounded-2xl" />
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
