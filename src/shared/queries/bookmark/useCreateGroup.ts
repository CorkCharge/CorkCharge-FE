import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookmarkGroup } from '../../apis/bookmark/bookmark.api';
import type { CreateGroupRequest } from '../../apis/bookmark/bookmark.type';

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGroupRequest) => createBookmarkGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group'] });
    },
  });
};
