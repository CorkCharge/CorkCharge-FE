import { fetchDoitList } from '@/shared/apis/helpRequest/helpRequest.api';
import { useQuery } from '@tanstack/react-query';

export const useDoitList = ({
  sido,
  sigungu,
  dong,
  keyword,
}: {
  sido?: string;
  sigungu?: string;
  dong?: string[];
  keyword?: string;
}) => {
  const sortedDong = dong?.slice().sort();
  const dongkey = sortedDong?.join(',');

  return useQuery({
    queryKey: ['doitList', { sido, sigungu, dongkey, keyword }],
    queryFn: () => fetchDoitList({ sido, sigungu, dong: sortedDong, keyword }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30, // 30분간 캐시 유지
  });
};
