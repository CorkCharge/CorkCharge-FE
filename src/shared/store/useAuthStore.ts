/**
 * 사용자 로그인 로직
 * user = {userId, role}
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  userId: number;
  role: 'USER' | 'OWNER' | 'ADMIN';
  accessToken: string;
  refreshToken: string;
}

interface StoredUser {
  userId: number;
  role: 'USER' | 'OWNER' | 'ADMIN';
}

interface AuthState {
  user: StoredUser | null;
  login: (userInfo: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: null,

      login: (userInfo: User) => {
        if (!userInfo.userId || !userInfo.role || !userInfo.accessToken || !userInfo.refreshToken) {
          console.error('로그인에 필요한 정보가 부족합니다.');
          return;
        }
        const { userId, role, accessToken, refreshToken } = userInfo;
        set({ user: { userId, role } });
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
      },

      logout: () => set({ user: null }),
    }),
    { name: 'auth' }
  )
);

export default useAuthStore;
