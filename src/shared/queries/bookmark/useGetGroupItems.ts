import { getBookmarkGroupDetail } from '@/shared/apis/bookmark/bookmark.api';
import type { MyStoreOrder } from '@/shared/apis/bookmark/bookmark.type';
import { useQuery } from '@tanstack/react-query';

export const useGetGroupItems = (id: number | undefined, sort: MyStoreOrder = 'LATEST') =>
  useQuery({
    queryKey: ['group', id, sort],
    queryFn: () => getBookmarkGroupDetail(id!, sort),
    select: (res) => res.data,
    enabled: !!id,
  });
