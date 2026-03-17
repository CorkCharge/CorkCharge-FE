import { getMyReviewBookmarks } from '@/shared/apis/bookmark/bookmark.api';
import { useQuery } from '@tanstack/react-query';

export const useGetMyKeepReviews = () =>
  useQuery({
    queryKey: ['reviewList', 'my'],
    queryFn: getMyReviewBookmarks,
    staleTime: 1000 * 60 * 5,
    select: (res) => {
      return res.data.map((d) => ({ ...d, scrap: true }));
    },
  });
