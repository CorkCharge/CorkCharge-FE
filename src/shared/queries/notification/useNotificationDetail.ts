import { getNotificationDetail } from '@/shared/apis/notification/notification.api';
import { useQuery } from '@tanstack/react-query';

export const useNotificationDetail = (id: number) =>
  useQuery({
    queryKey: ['notificationDetail', id],
    queryFn: () => getNotificationDetail(id),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    enabled: !!id,
  });
