/**
 * 사용자 로그인 로직
 * user = {userId, role}
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

import useMyPageStore from './useMyPageStore';
import apiClient from '../apis/apiClient';
import useBookmarkStore from './useBookmarkStore';

interface User {
  userId: number;
  role: 'USER' | 'OWNER' | 'ADMIN' | null;
  accessToken: string;
  refreshToken: string;
}

interface StoredUser {
  userId: number;
  role: 'USER' | 'OWNER' | 'ADMIN' | null;
}

interface AuthState {
  user: StoredUser | null;
  login: (_: User) => boolean;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist<AuthState>(
      (set) => ({
        user: null,

        login: (userInfo: User) => {
          if (!userInfo.userId || !userInfo.accessToken || !userInfo.refreshToken) {
            console.error('로그인에 필요한 정보가 부족합니다.');
            return false;
          }
          const { userId, role, accessToken, refreshToken } = userInfo;
          const { setMyProfile } = useMyPageStore.getState();
          apiClient
            .get('/users')
            .then((res) => {
              const { name, email, image_url } = res.data.data;
              const myPageData = { nickname: name, email, profile_image: image_url };
              setMyProfile(myPageData);
            })
            .catch((e) => {
              console.error(e);
              return false;
            });

          set({ user: { userId, role } });
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          return true;
        },

        logout: () => {
          set({ user: null });
          sessionStorage.clear();

          // 모든 persist들 reset
          useBookmarkStore.getState().resetAllBookmarks();
        },
      }),
      { name: 'auth' }
    )
  )
);

export default useAuthStore;
