import { getMasterRestaurant } from '@/shared/apis/user/user.api';
import { useQuery } from '@tanstack/react-query';

export const useMasterStores = () =>
  useQuery({
    queryKey: ['masterStores'],
    queryFn: getMasterRestaurant,
  });
