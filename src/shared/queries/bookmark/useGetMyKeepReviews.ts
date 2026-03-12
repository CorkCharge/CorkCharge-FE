import { getMyReviewBookmarks } from '@/shared/apis/bookmark/bookmark.api';
import { useQuery } from '@tanstack/react-query';

export const useGetMyKeepReviews = () =>
  useQuery({
    queryKey: ['keepReview'],
    queryFn: getMyReviewBookmarks,
    staleTime: 1000 * 60 * 5,
    select: (res) => res.data,
  });
