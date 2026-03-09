import { useEffect, useState } from 'react';

import CorkScore from '../../shared/components/corkScore/CorkScore';
import { fetchSavedReview, type SavedReview } from '@/shared/apis/bookmark/reviewApi';
import { useGetMyReviews } from '@/shared/queries/user/useMyReviewList';

//이거 저장한 리뷰임...
const Review = () => {
  const [savedReviews, SetSavedReviews] = useState<SavedReview[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchSavedReview();
        SetSavedReviews(res);
      } catch {
        console.error('저장한 리뷰 list API  호출 실패');
      }
    };
    fetchData();
  }, []);

  // const { data: savedReviews } = useGetMyReviews();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div>저장한 리뷰 list</div>
      {savedReviews &&
        savedReviews.map((savedReview) => {
          return (
            <CorkScore
              reviewId={savedReview.reviewId}
              restaurantName={savedReview.restaurantName}
              userName={savedReview.userName}
              content={savedReview.content}
              rating={savedReview.rating}
              createdAt={savedReview.createdAt}
              imageUrl={savedReview.reviewImageUrl}
              bookmarkCount={savedReview.bookmarkCount}
            />
          );
        })}
    </div>
  );
};

export default Review;
