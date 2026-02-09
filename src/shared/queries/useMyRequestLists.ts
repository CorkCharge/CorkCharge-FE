import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyRequestList } from '../apis/user/user.api';
import { secondRequest } from '../apis/helpRequest/helpRequest.api';
import type { CorkageTypeKr, Priority } from '../apis/helpRequest/helpRequest.type';

// 나의 해주세요 목록 가져오기
export const useGetRequestLists = () =>
  useQuery({
    queryKey: ['myRequestList'],
    queryFn: getMyRequestList,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

// 해주세요 요청 (2차)
export const useCreateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      corkageType,
      preferredPrice,
      firstPriority,
      secondPriority,
      content,
    }: {
      restaurantId: number;
      corkageType: CorkageTypeKr;
      preferredPrice: number;
      firstPriority: Priority;
      secondPriority: Priority;
      content: string;
    }) =>
      secondRequest({
        restaurantId,
        corkageType,
        preferredPrice,
        firstPriority,
        secondPriority,
        content,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myRequestList'] });
    },
  });
};
