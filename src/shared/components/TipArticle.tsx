import type { TipInfo } from '../apis/tip/tipListApi';

const TipArticle = ({
  tipId,
  title, //'와인 테스트';
  content, //'참석 전 물병, 스파이월러, 노트와 펜을 챙기면 편해요. 드레스 코드는 ‘스마트 캐주얼’인 경우가 많으니 미리 확인하시고, 일찍 도착해 무료 스낵도 즐겨보세요.';
  tipCategory, //'EVENT';
  imageUrls,
  createdAt, //'2025-08-07T21:40:31.530027';
}: TipInfo) => {
  return (
    <div className="mb-8">
      <div className="relative mb-6">
        <img
          key={tipId}
          alt={createdAt}
          src={imageUrls ? imageUrls[0] : 'https://placehold.co/393x358'} //우선 첫 번째 사진 사용
          className="h-[358px] w-[393px] rounded-2xl"
        />
        <div className="absolute bottom-8 left-8">
          <div className="w-[280px] font-bold text-[#FFFFFF]">
            <div className="mb-2 text-[20px]">{tipCategory}</div>
            <div className="text-[30px]">{title}</div>
          </div>
        </div>
      </div>

      {/* 상세 설명 */}
      <div className="ml-6 mr-6 w-[313px]">
        {/* <div className="mb-8 w-[200px] whitespace-pre-line text-[24px] font-bold text-[#1E1E1E]">
          서브타이틀
        </div> */}
        <div className="whitespace-pre-line text-[16px]">{content}</div>
      </div>
    </div>
  );
};
export default TipArticle;
