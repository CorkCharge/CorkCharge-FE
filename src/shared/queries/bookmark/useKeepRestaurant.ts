import { createBookmark, editBookmarkGroup } from '@/shared/apis/bookmark/bookmark.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 가게를 최초 그룹에 저장할 때
export const useSaveRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ targetId, groupIds }: { targetId: number; groupIds: number[] }) =>
      createBookmark({ targetId, targetType: 'RESTAURANT', groupIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group'] });
    },
  });
};

// 저장된 가게를 다른 그룹으로 수정-저장 할 때
export const useEditRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ restaurantId, groupIds }: { restaurantId: number; groupIds: number[] }) =>
      editBookmarkGroup({ restaurantId, groupIds }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['group'] }),
  });
};
