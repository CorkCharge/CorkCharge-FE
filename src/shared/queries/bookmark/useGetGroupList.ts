import { useQuery } from '@tanstack/react-query';
import { getBookmarkGroups } from '../../apis/bookmark/bookmark.api';

export const useGetGroupList = () => {
  return useQuery({
    queryKey: ['group'],
    queryFn: getBookmarkGroups,
    select: (res) => res.data.groups,
    staleTime: 0,
  });
};
