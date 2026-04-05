import type { TipInfo } from '../apis/tip/tipListApi';
import { GradOverlay } from './common/OverLayImage';
import TipDefaultImage from './home/TipDefaultImage';

const TipArticle = ({ title, content, tipCategory, imageUrls }: TipInfo) => {
  return (
    <>
      <div className="relative mb-6">
        {imageUrls.length > 0 ? (
          <>
            <GradOverlay />
            <img src={imageUrls[0]} className="aspect-square w-full rounded-b-2xl" />
          </>
        ) : (
          <TipDefaultImage className="aspect-square rounded-b-2xl" />
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
        <div className="whitespace-pre-line pb-10 font-medium">{content}</div>
      </div>
    </>
  );
};
export default TipArticle;
