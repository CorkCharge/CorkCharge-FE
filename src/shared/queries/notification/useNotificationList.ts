import { useQuery } from '@tanstack/react-query';
import { getNotificationList } from '../../apis/notification/notification.api';

export const useNotificationList = () =>
  useQuery({
    queryKey: ['notificationList'],
    queryFn: getNotificationList,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 90,
  });
