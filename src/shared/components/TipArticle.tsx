import type { TipInfo } from '../apis/tip/tipListApi';

const TipArticle = ({ title, content, tipCategory, imageUrls }: TipInfo) => {
  return (
    <>
      <div className="relative mb-6">
        {imageUrls.length > 0 ? (
          <img src={imageUrls[0]} className="aspect-square w-full rounded-b-2xl" />
        ) : (
          <div className="aspect-square w-full rounded-b-2xl bg-gray-500" />
        )}

        <div className="absolute bottom-6">
          <div className="px-10 font-bold text-white">
            <div className="mb-2 text-[20px]">{tipCategory}</div>
            <div className="text-[30px]">{title}</div>
          </div>
        </div>
      </div>

      {/* 상세 설명 */}
      <div className="mx-6">
        {/* <div className="mb-8 w-[200px] whitespace-pre-line text-[24px] font-bold text-[#1E1E1E]">
          서브타이틀
        </div> */}
        <div className="whitespace-pre-line text-[16px]">{content}</div>
      </div>
    </>
  );
};
export default TipArticle;
