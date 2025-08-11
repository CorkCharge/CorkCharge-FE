import { useState, useEffect } from 'react';

import Header from '@/shared/components/common/Header';
import apiClient from '@/shared/apis/apiClient';
import MyReviewItem from '@/shared/components/myPage/MyReviwItem';

interface MyReiew {
  reviewId: number;
  restaurantId: number;
  userId: number;
  content: string;
  rating: number;
  createdAt: string;
}

function MyReview() {
  const [reviews, setReviews] = useState<MyReiew[]>([]);

  useEffect(() => {
    apiClient
      .get('/users/reviews', { params: { userId: 1 } })
      .then((res) => {
        setReviews(res.data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const renderReviews = () =>
    reviews.map((review) => <MyReviewItem key={review.reviewId} review={review} />);

  return (
    <div className="px-4">
      <Header type="back" title="리뷰관리" />
      <section className="flex flex-col gap-5 py-2">{renderReviews()}</section>
    </div>
  );
}

export default MyReview;
