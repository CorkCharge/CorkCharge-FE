import { useNavigate } from 'react-router-dom';

import type { TipList } from '@/shared/apis/tip/tipListApi';

const TipPreview = ({ tipId, title, tipCategory, imageUrl }: TipList) => {
  const navigate = useNavigate();
  const handleGoTip = () => {
    console.log('해당 tipArticle로 이동');
    navigate(`/tipArticle/${tipId}`);
  };

  return (
    <article
      className="article relative aspect-[5/6] cursor-pointer overflow-hidden"
      onClick={handleGoTip}
    >
      {imageUrl ? (
        <>
          <img src={imageUrl} className="h-full w-full object-cover" loading="lazy" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        </>
      ) : (
        <div className="h-full w-full bg-gray-500" />
      )}

      <div className="absolute inset-x-0 bottom-0 z-[1] p-4">
        <span className="mb-1 text-sm text-white">{tipCategory}</span>
        {/* 3줄까지만 출력하고 나머진 ... 처리 */}
        <p className="mt-1 line-clamp-3 text-[17px] font-bold leading-tight text-white">{title}</p>
      </div>
    </article>
  );
};
export default TipPreview;
