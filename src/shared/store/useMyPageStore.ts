/**
 * 마이페이지에서 사용하는 store
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Review } from '../types/mypage';

interface MyProfile {
  nickname: string;
  socialId: string;
  reviews: Review[];
  profile_image: string;
}

interface MyPageStore {
  myProfile: MyProfile;
  setMyProfile: (fetched: Partial<MyProfile>) => void;
}

const initState = {
  nickname: '',
  socialId: '',
  reviews: [],
  profile_image: '',
};

const useMyPageStore = create<MyPageStore>()(
  persist<MyPageStore>(
    (set) => ({
      myProfile: {
        nickname: '',
        socialId: '',
        reviews: [],
        profile_image: '',
      },

      setMyProfile: (fetched) => set((prev) => ({ myProfile: { ...prev.myProfile, ...fetched } })),

      clear: () => set({ myProfile: { ...initState } }),
    }),
    { name: 'my-profile' }
  )
);

export default useMyPageStore;
