import { useQuery } from '@tanstack/react-query';
import { fetchCorkageReviews } from '@/shared/apis/review/review.api';

// 콜키지 리뷰 가져오기
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
    queryKey: ['reviewList', 'all', { keyword, sido, sigungu, dongKey, isSortByBookmark }],
    queryFn: () => fetchCorkageReviews(keyword, sido, sigungu, sortedDong, isSortByBookmark),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
