import { useQuery } from '@tanstack/react-query';
import { fetchCorkageReviews } from '../apis/review/review.api';

export const useReviewList = ({
  keyword,
  sido,
  sigungu,
  dongList,
  isSortByBookmark,
}: {
  keyword?: string;
  sido?: string;
  sigungu?: string;
  dongList?: string[];
  isSortByBookmark?: boolean;
}) => {
  const sortedDong = dongList?.slice().sort();
  const dongKey = sortedDong?.join(',');
  return useQuery({
    queryKey: ['reviewList', { keyword, sido, sigungu, dongKey, isSortByBookmark }],
    queryFn: () => fetchCorkageReviews(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
