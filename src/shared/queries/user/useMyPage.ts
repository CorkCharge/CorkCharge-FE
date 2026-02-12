import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyPageInfo, modifyName, modifyRole } from '../../apis/user/user.api';
import type { Role } from '../../apis/user/user.type';

// 마이페이지 진입 시 데이터 패칭
export const useGetMypageInfo = () =>
  useQuery({ queryKey: ['mypageInfo'], queryFn: getMyPageInfo, staleTime: Infinity });

// 가입 시 닉네임 설정
export const useSetNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ role, nickname }: { role: Role; nickname: string }) =>
      modifyRole({ role, nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypageInfo'] });
    },
  });
};

// 사용자 정보 수정
export const useUpdateNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name }: { name: string }) => modifyName(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypageInfo'] });
    },
  });
};
