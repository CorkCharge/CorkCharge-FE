import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import MyReviewItem from '@/shared/components/myPage/MyReviewItem';
import { useGetMyReviews } from '@/shared/queries/user/useMyReviewList';

function MyReview() {
  const navigate = useNavigate();

  const { data: reviews } = useGetMyReviews();

  const renderReviews = () => {
    if (reviews?.length === 0)
      return <p className="flex h-20 items-center justify-center">작성한 리뷰가 없습니다</p>;
    return reviews?.map((review) => <MyReviewItem key={review.reviewId} review={review} />);
  };

  return (
    <div className="relative px-4">
      <Header
        type="back"
        title="리뷰관리"
        backFn={() => navigate(-1)}
        className="fixed top-0 z-[5] bg-white"
        style={{ width: 'calc(100% - 32px)', maxWidth: 'calc(var(--app-width) - 32px)' }}
      />
      <section className="mt-12 flex flex-col gap-5 py-2">{renderReviews()}</section>
    </div>
  );
}

export default MyReview;
