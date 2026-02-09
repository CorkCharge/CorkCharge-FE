import { useNavigate } from 'react-router-dom';

import type { ReviewResponse } from '@/shared/apis/review/review.type';
import DefaultImage from '../common/DefaultImage';
import { StarWithStroke } from '../common/StarRate';

function ReviewItem({ review }: { review: ReviewResponse }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-[172px] shrink-0 cursor-pointer rounded-2xl bg-[var(--gray-1)]"
      onClick={() => navigate(`/detail-info/${review.restaurantId}`)}
    >
      <div className="px-3 py-[10px]">
        <span className="text-sm font-bold">{review.restaurantName}</span>
        <div className="flex items-center">
          <StarWithStroke
            rate={review.rating}
            spacing="3px"
            className="mr-1 h-[14px]"
            width="14"
            height="13"
          />
          <span className="text-sm font-medium text-[var(--gray-8)]">{review.rating}</span>
        </div>
      </div>

      {review.imageUrls.length === 0 ? (
        <DefaultImage
          hasLogo={true}
          containerClassName="h-[172px]"
          logoHeight="82px"
          logoWidth="50px"
          className="h-full"
        />
      ) : (
        <img src={review.imageUrls[0]} className="size-[172px]" />
      )}

      <div className="px-[9.5px] py-2">
        <div className="flex justify-between text-[10px] font-medium">
          <span className="text-[var(--gray-8)]">{review.writer}</span>
          <span>{review.createdAt.split('T')[0].replaceAll('-', '.')}</span>
        </div>
        <p className="mt-1 text-xs font-medium">{review.content}</p>
      </div>
    </div>
  );
}

export default ReviewItem;
