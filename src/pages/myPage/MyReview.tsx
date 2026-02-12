import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import MyReviewItem from '@/shared/components/myPage/MyReviewItem';
import { useGetMyReviews } from '@/shared/queries/user/useMyReviewList';

function MyReview() {
  const navigate = useNavigate();

  const { data: reviews } = useGetMyReviews();

  const renderReviews = () =>
    reviews?.map((review) => <MyReviewItem key={review.reviewId} review={review} />);

  return (
    <div className="px-4">
      <Header type="back" title="리뷰관리" backFn={() => navigate(-1)} />
      <section className="flex flex-col gap-5 py-2">{renderReviews()}</section>
    </div>
  );
}

export default MyReview;
