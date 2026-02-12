import { deleteReview, modifyReview } from '@/shared/apis/review/review.api';
import { getMyReviews } from '@/shared/apis/user/user.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetMyReviews = () =>
  useQuery({
    queryKey: ['myReviews'],
    queryFn: getMyReviews,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

export const useUpdateMyReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      content,
      rating,
      images,
    }: {
      reviewId: number;
      content: string;
      rating: number;
      images?: File[];
    }) => modifyReview({ reviewId, content, rating, images }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myReviews'] }),
  });
};

export const useDeleteMyReview = () => {
  return useMutation({
    mutationFn: (id: number) => deleteReview(id),
  });
};
