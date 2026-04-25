import { fetchStoreReviews } from '@/shared/apis/review/review.api';
import { useQuery } from '@tanstack/react-query';

// 식당의 리뷰 가져오기
export const useGetRestaurantReview = (id: number) =>
  useQuery({
    queryKey: ['reviewList', 'restaurant', id],
    queryFn: () => fetchStoreReviews(id),
  });
