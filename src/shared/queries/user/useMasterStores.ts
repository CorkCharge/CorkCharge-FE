import { getMasterRestaurant } from '@/shared/apis/user/user.api';
import { useQuery } from '@tanstack/react-query';

export const useMasterStores = () =>
  useQuery({
    queryKey: ['masterStores'],
    queryFn: getMasterRestaurant,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60,
  });
