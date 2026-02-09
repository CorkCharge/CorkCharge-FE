import { useQuery } from '@tanstack/react-query';
import { fetchCategoryStores } from '../apis/restaurant/restaurant.api';

export const useCategoryStores = ({
  sido,
  sigungu,
  dong,
  category,
}: {
  sido?: string;
  sigungu?: string;
  dong?: string[];
  category: string;
}) => {
  const sortedDong = dong?.slice().sort();
  const dongkey = sortedDong?.join(',');

  return useQuery({
    queryKey: ['categoryList', { sido, sigungu, dongkey, category }],
    queryFn: () => fetchCategoryStores({ sido, sigungu, dongList: sortedDong, category }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30, // 30분간 캐시 유지
  });
};
