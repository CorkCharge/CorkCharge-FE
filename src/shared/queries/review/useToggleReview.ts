import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBookmark, toggleBookmark } from '@/shared/apis/bookmark/bookmark.api';
import type { ReviewResponse } from '@/shared/apis/review/review.type';

type ReviewType = ReviewResponse;

export const useToggleReviewLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isLiked }: { id: number; isLiked: boolean }) =>
      toggleBookmark({ targetType: 'REVIEW', targetId: id, isBookmarked: isLiked }),

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['reviewList'] });

      const previous = queryClient.getQueriesData({ queryKey: ['reviewList'] });

      queryClient.setQueriesData({ queryKey: ['reviewList'] }, (old: unknown) => {
        if (!old || !Array.isArray(old)) return old;

        const reviewList = old as ReviewType[];

        return reviewList.map((review) =>
          review.reviewId === id
            ? {
                ...review,
                bookmarkCount: review.scrap ? review.bookmarkCount - 1 : review.bookmarkCount + 1,
                scrap: !review.scrap,
              }
            : review
        );
      });

      return { previous };
    },

    onError: (err, _variables, context) => {
      console.error('리뷰 저장 mutate 실패: ' + err);
      if (context?.previous) {
        context.previous.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewList'] });
    },
  });
};

export const useDeleteReviewLike = ({ id }: { id: number }) =>
  useMutation({
    mutationFn: () => deleteBookmark({ targetId: id, targetType: 'REVIEW' }),
  });
