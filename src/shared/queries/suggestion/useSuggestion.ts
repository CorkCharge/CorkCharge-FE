import { getSuggestionDetail, getSuggestionList } from '@/shared/apis/suggestion/suggestion.api';
import { useQuery } from '@tanstack/react-query';

// 문의하기 리스트 캐싱
export const useGetSuggestionList = () =>
  useQuery({
    queryKey: ['suggestionList'],
    queryFn: getSuggestionList,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

// 문의하기 게시글 캐싱
export const useGetSuggestionInfo = (postId: number) =>
  useQuery({
    queryKey: ['suggestionInfo', postId],
    queryFn: () => getSuggestionDetail(postId),
    enabled: !!postId,
    staleTime: Infinity,
  });
