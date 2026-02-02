import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookmarkGroup } from '../apis/bookmark/bookmark.api';

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBookmarkGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group'] });
    },
  });
};
